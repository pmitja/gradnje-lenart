"use server"

import { mainFormSchema } from "@/schemas"
import { z } from "zod"
import { db } from '@/lib/db'

export const newLocation = async (values: z.infer<typeof mainFormSchema>) => {
  const validatedFields = mainFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { naziv, opis, mesto, naslov, stanovanja } = validatedFields.data

  const location = await db.location.create({
    data: {
      name: naziv,
      description: opis,
      city: mesto,
      address: naslov,
      realEstates: {
        create: stanovanja.map(stanovanje => ({
          name: stanovanje.naziv,
          description: '',
          number: stanovanje['stevilka-stanovanja'],
          floor: stanovanje.etaza,
          size: parseFloat(stanovanje.kvadratura),
          priceWithTax: parseFloat(stanovanje['cena-brez-ddv']),
          price: parseFloat(stanovanje.cena),
          images: [],
        }))
      }
    },
  })

  return { success: 'Nova lokacija je dodana!' }
}
