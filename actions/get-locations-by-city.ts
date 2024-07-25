"use server"

import { db } from '@/lib/db'
import { projectFilterSchema } from '@/validation-schemas/project-filters-schema'
import { z } from 'zod';

export const getLocationsByCity = async ( values: z.infer<typeof projectFilterSchema>) => {
  
  try {
    const validatedFields = projectFilterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }
    const { location } = values;

    const locations = await db.location.findMany({
      where: {
        city: location
      }
    })

    if (locations.length === 0) {
      return null
    }

    return locations
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}
