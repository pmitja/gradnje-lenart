'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export async function getClientSales(clientId: string) {
  try {
    // Get client details
    const client = await db.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      throw new Error('Client not found')
    }

    // Get all real estates owned by this client (sales)
    const sales = await db.realEstate.findMany({
      where: {
        clientId: clientId,
        status: StatusType.Prodano,
      },
      include: {
        location: {
          select: {
            name: true,
            address: true,
            city: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Get all reservations made by this client (using email match)
    const reservations = await db.reservation.findMany({
      where: {
        email: client.email,
      },
      include: {
        realEstate: {
          include: {
            location: {
              select: {
                name: true,
                address: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      client,
      sales,
      reservations,
    }
  } catch (error) {
    console.error('Failed to fetch client sales:', error)
    throw new Error('Failed to fetch client sales')
  }
} 