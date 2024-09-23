/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { updateRealEstateSchema } from '@/schemas'

export const updateRealEstate = async (values: z.infer<typeof updateRealEstateSchema>) => {
  const validatedFields = updateRealEstateSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { apartment, locationId } = validatedFields.data

  try {
    if (locationId) {
      await db.realEstate.update({
        where: {
          id: locationId,
        },
        data: {
          name: apartment.name,
          number: apartment.number,
          floor: apartment.floor,
          size: apartment.size,
          price: apartment.price,
          priceWithTax: apartment.priceWithTax,
          status: apartment.status,
          images: apartment.images,
          description: apartment.description,
          shortDescription: apartment.shortDescription,
          spaces: apartment.spaces,
          energyLevel: apartment.energyLevel,
          parkingSpaces: apartment.parkingSpaces,
          technicalData: apartment.technicalData
            ? apartment.technicalData.map((td) => ({
              id: td.id, text: td.text,
            }))
            : undefined,
          files: apartment.files
            ? apartment.files.map((td) => ({
              name: td.name, key: td.key,
            }))
            : undefined,
          isExposed: apartment.isExposed,
        },
      })
    }
    return {
      success: 'Nepremičnina je posodobljena!',
    }
  } catch (error) {
    console.error('Error updating/creating apartments:', error)
    return {
      error: 'An error occurred while updating/creating apartments',
    }
  }
}
