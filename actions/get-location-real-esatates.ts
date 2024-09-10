'use server'

import { db } from '@/lib/db'

export const getLocationRealEstates = async (slug: string) => {
  const location = await db.location.findUnique({
    where: {
      slug,
    },
    include: {
      realEstates: true,
    },
  })

  return location
}
