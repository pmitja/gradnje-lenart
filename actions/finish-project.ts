'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export async function finishProject(locationSlug: string) {
  try {
    // Get the location and its real estates
    const location = await db.location.findUnique({
      where: {
        slug: locationSlug,
      },
      include: {
        realEstates: true,
      },
    })

    if (!location) {
      return {
        error: 'Location not found',
      }
    }

    // Check if all real estates are sold
    const unsoldRealEstates = location.realEstates.filter((re) => re.status !== StatusType.Prodano)

    if (unsoldRealEstates.length > 0) {
      return {
        error: 'Not all real estates are sold',
        unsoldCount: unsoldRealEstates.length,
      }
    }

    // Update the location's isActive status
    await db.location.update({
      where: {
        id: location.id,
      },
      data: {
        isActive: false,
      },
    })

    revalidatePath('/nadzorna-plosca')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error finishing project:', error)
    return {
      error: 'An error occurred while finishing the project',
    }
  }
}
