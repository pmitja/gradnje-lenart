'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { projectFilterSchema } from '@/validation-schemas/project-filters-schema'

export const getLocationsByCity = async (values: z.infer<typeof projectFilterSchema>) => {
  try {
    const validatedFields = projectFilterSchema.safeParse(values)

    if (!validatedFields.success) {
      return {
        error: 'Invalid fields',
      }
    }

    const { location, type } = values

    let locations: any[] = []

    if (location === 'all' && type === 'all') {
      locations = await db.location.findMany()
      return locations
    }

    if (location === 'all' && !type) {
      locations = await db.location.findMany()
      return locations
    } if (location === 'all' && type) {
      locations = await db.location.findMany({
        where: {
          type,
        },
      })
      return locations
    }

    if (type === 'all' && location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      })
      return locations
    } if (type === 'all' && location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      })
      return locations
    }

    if (type) {
      locations = await db.location.findMany({
        where: {
          type,
        },
      })
      return locations
    } if (location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      })
      return locations
    } if (location && type) {
      locations = await db.location.findMany({
        where: {
          city: location,
          type,
        },
      })
      return locations
    }
    locations = await db.location.findMany()

    if (locations.length === 0) {
      return null
    }

    return locations
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}
