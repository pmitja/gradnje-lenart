'use server'

import { db } from '@/lib/db'

export async function getRandomExposedRealEstate() {
  try {
    const exposedRealEstates = await db.realEstate.findMany({
      where: {
        isExposed: true,
      },
      include: {
        location: true,
      },
    })

    if (exposedRealEstates.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * exposedRealEstates.length)

    return exposedRealEstates[randomIndex]
  } catch (error) {
    console.error('Error fetching random exposed real estate:', error)
    return null
  }
}
