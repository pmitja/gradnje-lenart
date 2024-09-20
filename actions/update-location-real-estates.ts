/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { generateSlugWithNumber } from '@/lib/helpers'
import { updateSchema } from '@/schemas'

export const updateLocationRealEstate = async (values: z.infer<typeof updateSchema>) => {
  const validatedFields = updateSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { apartments, locationSlug } = validatedFields.data

  const location = await db.location.findUnique({
    where: {
      slug: locationSlug,
    },
  })

  if (!location) {
    return {
      error: 'Location not found',
    }
  }
  try {
    await Promise.all(
      apartments.map(async (apartment) => {
        if (apartment.id) {
          await db.realEstate.update({
            where: {
              id: apartment.id,
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
        } else {
          let slug = generateSlugWithNumber(location.slug, apartment.number)

          let slugExists = true

          let slugCounter = 1

          while (slugExists) {
            const existingRealEstate = await db.realEstate.findUnique({
              where: {
                slug,
              },
            })

            if (!existingRealEstate) {
              slugExists = false
            } else {
              slug = generateSlugWithNumber(location.slug, `${apartment.number}-${slugCounter}`)
              slugCounter++
            }
          }

          await db.realEstate.create({
            data: {
              name: apartment.name,
              number: apartment.number,
              floor: apartment.floor,
              size: apartment.size,
              priceWithTax: apartment.priceWithTax,
              price: apartment.price,
              locationId: location.id,
              slug,
              status: apartment.status,
              images: apartment.images,
              description: apartment.description,
              shortDescription: apartment.shortDescription,
              spaces: apartment.spaces,
              energyLevel: apartment.energyLevel,
              parkingSpaces: apartment.parkingSpaces,
              technicalData: apartment.technicalData
                ? apartment.technicalData.map((td) => ({
                  id: td.id,
                  text: td.text,
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
      }),
    )
    return {
      success: 'Lokacija je posodobljena!',
    }
  } catch (error) {
    console.error('Error updating/creating apartments:', error)
    return {
      error: 'An error occurred while updating/creating apartments',
    }
  }
}
