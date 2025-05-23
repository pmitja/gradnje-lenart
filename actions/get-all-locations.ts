'use server'

import { db } from '@/lib/db'

export const getAllLocations = async () => {
  try {
    const locations = await db.location.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        realEstates: {
          select: {
            id: true,
          },
        },
      },
    })

    if (locations.length === 0) {
      return null
    }

    return locations.map((location) => ({
      ...location,
      count: {
        realEstates: location.realEstates.length,
      },
      realEstates: undefined,
    }))
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}
