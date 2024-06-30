"use server"

import { mainFormSchema } from "@/schemas"
import { z } from "zod"
import { db } from '@/lib/db'
import { generateSlug, generateSlugWithNumber } from "@/lib/helpers"

export const newLocation = async (values: z.infer<typeof mainFormSchema>) => {
  const validatedFields = mainFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, city, address, apartments } = validatedFields.data

  const slug = generateSlug(name, city)

  const location = await db.location.create({
    data: {
      name: name,
      description: description,
      city: city,
      address: address,
      slug: slug,
    }
  })

  // Create the RealEstate entries associated with the created Location
  await Promise.all(apartments.map((apartment, index) => 
    db.realEstate.create({
      data: {
        name: apartment.name,
        description: '',
        number: apartment.number,
        floor: apartment.floor,
        size: apartment.size,
        priceWithTax: apartment.price,
        price: apartment.priceWithTax,
        images: [],
        locationId: location.id,
        slug: generateSlugWithNumber(location.slug, apartment.number),
        status: apartment.status
      }
    })
  ))

  return { success: 'Nova lokacija je dodana!' }
}
