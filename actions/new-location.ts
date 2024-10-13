'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/lib/db'
import { generateSlug, generateSlugWithNumber } from '@/lib/helpers'
import { mainFormSchema } from '@/schemas'

export const newLocation = async (values: z.infer<typeof mainFormSchema>) => {
  const validatedFields = mainFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const {
    name, description, city, address,
    apartments, images, type, isActive,
  } = validatedFields.data

  let slug = `${generateSlug(city)}`

  console.log(slug)

  const isCityTaken = await db.location.findMany({
    where: {
      city,
    },
  })

  console.log(isCityTaken, isCityTaken.at(-1)?.id)

  if (isCityTaken.at(-1)?.id) {
    slug = `${slug}-${isCityTaken.at(-1)?.id}`
  }

  const location = await db.location.create({
    data: {
      name,
      description,
      city,
      address,
      slug,
      images,
      type,
      isActive,
    },
  })

  console.log('Location created with ID:', location.id, 'and type:', typeof location.id)

  // Ensure locationId is a number
  const locationId: number = location.id as number

  // Create the RealEstate entries associated with the created Location
  await Promise.all(
    apartments.map((apartment) => {
      console.log(
        `Creating RealEstate with locationId: ${locationId} and type: ${typeof locationId}`,
      )

      return db.realEstate.create({
        data: {
          name: apartment.name,
          number: apartment.number,
          floor: apartment.floor,
          size: apartment.size,
          priceWithTax: apartment.priceWithTax,
          price: apartment.price,
          locationId: location.id,
          slug: generateSlugWithNumber(location.slug, apartment.number),
          status: apartment.status,
          images: apartment.images,
          description: apartment.description,
          shortDescription: apartment.shortDescription,
          spaces: apartment.spaces,
          energyLevel: apartment.energyLevel,
          parkingSpaces: apartment.parkingSpaces,
          technicalData: apartment.technicalData
            ? {
              create: apartment.technicalData.map((td) => ({
                id: td.id,
                text: td.text,
              })),
            }
            : undefined,
          files: apartment.files
            ? apartment.files.map((td) => ({
              name: td.name, key: td.key,
            }))
            : undefined,
        },
      })
    }),
  )

  revalidatePath('/nadzorna-plosca')

  return {
    success: 'Nova lokacija je dodana!',
  }
}
