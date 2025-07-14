'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export const getAllSales = async (
  skip: number = 0,
  take: number = 20,
  search: string = '',
  sortBy: 'updatedAt' | 'priceWithTax' | 'customer' = 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'desc',
) => {
  // Build where clause for search
  const where: any = {
    status: StatusType.Prodano,
    customer: {
      isNot: null,
    },
  }
  if (search) {
    where.OR = [
      { customer: { fullName: { contains: search, mode: 'insensitive' } } },
      { customer: { email: { contains: search, mode: 'insensitive' } } },
      { location: { name: { contains: search, mode: 'insensitive' } } },
    ]
  }

  // Build orderBy clause
  let orderBy: any = { updatedAt: 'desc' }
  if (sortBy === 'priceWithTax') {
    orderBy = { priceWithTax: sortOrder }
  } else if (sortBy === 'customer') {
    orderBy = { customer: { fullName: sortOrder } }
  } else {
    orderBy = { updatedAt: sortOrder }
  }

  const sales = await db.realEstate.findMany({
    where,
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
    orderBy,
    skip,
    take,
  })

  const total = await db.realEstate.count({
    where,
  })

  return { sales, total }
}
