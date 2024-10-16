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
    })

    if (locations.length === 0) {
      return null
    }

    return locations
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}
