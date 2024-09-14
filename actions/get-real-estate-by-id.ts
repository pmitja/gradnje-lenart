'use server'

import { db } from '@/lib/db'

export const getRealEstateById = async (id: string) => {
  const location = await db.realEstate.findUnique({
    where: {
      id,
    },
  })

  return location
}
