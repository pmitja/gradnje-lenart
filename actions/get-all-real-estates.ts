'use server'

import { db } from '@/lib/db'

export async function getAllRealEstates() {
  try {
    const realEstates = await db.realEstate.findMany({
      include: {
        location: true,
      },
    })

    return realEstates
  } catch (error) {
    console.error('Error fetching real estates:', error)
    return []
  }
}
