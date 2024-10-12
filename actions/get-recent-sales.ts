'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export const getRecentSales = async (limit: number = 5) => {
  const recentSales = await db.realEstate.findMany({
    where: {
      status: StatusType.Prodano,
      customer: {
        isNot: null,
      },
    },
    include: {
      customer: {
        select: {
          fullName: true,
          email: true,
        },
      },
      location: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: limit,
  })

  return recentSales
}
