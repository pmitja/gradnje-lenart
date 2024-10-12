'use server'

import { db } from '@/lib/db'

export const getLocationCounts = async () => {
  const activeLocations = await db.location.count({
    where: {
      isActive: true,
    },
  })

  const inactiveLocations = await db.location.count({
    where: {
      isActive: false,
    },
  })

  return {
    activeLocations, inactiveLocations,
  }
}
