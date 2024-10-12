'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export const getRecentSales = async (limit: number = 5) => {
  const recentSales = await db.realEstate.findMany({
    where: {
      status: StatusType.Prodano,
    },
    include: {
      customer: true,
      location: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: limit,
  })

  return recentSales
}
