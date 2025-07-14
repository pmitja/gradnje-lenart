'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

import { getLocationCounts } from './get-location-counts'
import { getSoldApartmentsCount } from './get-sold-apartments-count'

export async function getDashboardData() {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        realEstate: {
          include: {
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const recentSales = await db.realEstate.findMany({
      where: {
        status: StatusType.Prodano,
        OR: [
          { customerId: { not: null } },
          { clientId: { not: null } },
        ],
      },
      include: {
        customer: {
          select: {
            fullName: true,
            email: true,
          },
        },
        client: {
          select: {
            name: true,
            surname: true,
            email: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    })

    const { activeLocations, inactiveLocations } = await getLocationCounts()

    const soldCount = await getSoldApartmentsCount()

    return {
      reservations: reservations.map((reservation) => ({
        ...reservation,
        realEstate: {
          ...reservation.realEstate,
          location: reservation.realEstate.location.name,
          apartmentNumber: reservation.realEstate.number || '',
        },
      })),
      reservationsCount: reservations.length,
      activeLocations,
      inactiveLocations,
      soldApartmentsCount: soldCount,
      recentSales,
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    return {
      reservations: [],
      reservationsCount: 0,
      activeLocations: 0,
      inactiveLocations: 0,
      soldApartmentsCount: 0,
      recentSales: [],
    }
  }
}
