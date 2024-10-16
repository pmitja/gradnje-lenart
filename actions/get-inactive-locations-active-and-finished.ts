'use server'

import { db } from '@/lib/db'

export const getAllLocationsActiveAndFinished = async () => {
  try {
    const inactiveLocations = await db.location.findMany({
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
