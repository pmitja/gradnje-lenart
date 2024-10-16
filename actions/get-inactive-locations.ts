'use server'

import { db } from '@/lib/db'

export const getInactiveLocations = async () => {
  try {
    const inactiveLocations = await db.location.findMany({
      where: {
        isActive: false,
      },
      include: {
        realEstates: true,
      },
    })

    return inactiveLocations
  } catch (error) {
    console.error('Error fetching inactive locations:', error)
    return []
  }
}
