'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export const getSoldApartmentsCount = async () => {
  const count = await db.realEstate.count({
    where: {
      status: StatusType.Prodano,
    },
  })

  return count
}
