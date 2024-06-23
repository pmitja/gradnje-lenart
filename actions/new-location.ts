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

  const { naziv, opis, mesto, naslov, stanovanja } = validatedFields.data

  const slug = generateSlug(naziv, mesto)

  const location = await db.location.create({
    data: {
      name: naziv,
      description: opis,
      city: mesto,
      address: naslov,
      slug: slug,
    }
  })

  // Create the RealEstate entries associated with the created Location
  await Promise.all(stanovanja.map((stanovanje, index) => 
    db.realEstate.create({
      data: {
        name: stanovanje.naziv,
        description: '',
        number: stanovanje['stevilka-stanovanja'],
        floor: stanovanje.etaza,
        size: parseFloat(stanovanje.kvadratura),
        priceWithTax: parseFloat(stanovanje['cena-brez-ddv']),
        price: parseFloat(stanovanje.cena),
        images: [],
        locationId: location.id,
        slug: generateSlugWithNumber(location.slug, stanovanje['stevilka-stanovanja']),
      }
    })
  ))

  return { success: 'Nova lokacija je dodana!' }
}
