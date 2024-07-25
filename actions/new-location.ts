"use server"

import { mainFormSchema } from "@/schemas"
import { z } from "zod"
import { db } from '@/lib/db'
import { generateSlug, generateSlugWithNumber } from "@/lib/helpers"
import { revalidatePath } from "next/cache"

export const newLocation = async (values: z.infer<typeof mainFormSchema>) => {
  const validatedFields = mainFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, city, address, apartments, images } = validatedFields.data

  let slug = `${generateSlug(city)}`

  console.log(slug)

  const isCityTaken = await db.location.findMany({
    where: { city: city }
  })

  console.log(isCityTaken, isCityTaken.at(-1)?.id)

  if (isCityTaken.at(-1)?.id) {
    slug = `${slug}-${isCityTaken.at(-1)?.id}`
  }

  console.log(slug)

  const location = await db.location.create({
    data: {
      name: name,
      description: description,
      city: city,
      address: address,
      slug: slug,
      images: images
    }
  })

  console.log('Location created with ID:', location.id, 'and type:', typeof location.id)

  // Ensure locationId is a number
  const locationId: number = location.id as number;

  // Create the RealEstate entries associated with the created Location
  await Promise.all(apartments.map((apartment, index) => {
    console.log(`Creating RealEstate with locationId: ${locationId} and type: ${typeof locationId}`);
    
    return db.realEstate.create({
      data: {
        name: apartment.name,
        description: '',
        number: apartment.number,
        floor: apartment.floor,
        size: apartment.size,
        priceWithTax: apartment.price,
        price: apartment.priceWithTax,
        images: apartment.images,
        locationId: locationId,
        slug: generateSlugWithNumber(location.slug, apartment.number),
        status: apartment.status
      }
    })
  }))

  revalidatePath('nadzorna-plosca')

  return { success: 'Nova lokacija je dodana!' }
}
