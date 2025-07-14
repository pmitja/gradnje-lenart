'use server'

import { db } from '@/lib/db'
import { z } from 'zod'

const clientSchema = z.object({
  name: z.string().min(1, 'Ime je obvezno'),
  surname: z.string().min(1, 'Priimek je obvezen'),
  address: z.string().min(1, 'Naslov je obvezen'),
  phone: z.string().min(1, 'Telefon je obvezen'),
  email: z.string().email('Email ni pravilen'),
  taxNumber: z.string().min(1, 'Davčna številka je obvezna'),
  idNumber: z.string().min(1, 'Matična številka je obvezna'),
})

export async function newClient(input: any) {
  const validatedFields = clientSchema.safeParse(input)

  if (!validatedFields.success) {
    return {
      error: 'Neveljavna polja',
      details: validatedFields.error.flatten(),
    }
  }

  const { name, surname, address, phone, email, taxNumber, idNumber } = validatedFields.data


    const client = await db.client.create({
      data: {
        name,
        surname,
        address,
        phone,
        email,
        taxNumber,
        idNumber,
      },
    })

  return {
    success: 'Klient je bil uspešno dodan!',
    id: client.id,
  }
}

export default newClient; 