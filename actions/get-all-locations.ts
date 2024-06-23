"use server"

import { db } from '@/lib/db'

export const getLocations = async () => {
  const location = await db.location.findMany()
  return location
}
