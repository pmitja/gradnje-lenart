'use server'

import { db } from '@/lib/db'

export async function updateClient({
  id,
  name,
  surname,
  address,
  phone,
  email,
  taxNumber,
  idNumber,
}: {
  id: string
  name: string
  surname: string
  address: string
  phone: string
  email: string
  taxNumber: string
  idNumber: string
}) {
  return await db.client.update({
    where: { id },
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
}

export default updateClient; 