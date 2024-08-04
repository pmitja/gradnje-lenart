'use server';

import { db } from '@/lib/db';
import { projectFilterSchema } from '@/validation-schemas/project-filters-schema';
import { z } from 'zod';

export const getLocationsByCity = async (
  values: z.infer<typeof projectFilterSchema>
) => {
  try {
    const validatedFields = projectFilterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }
    const { location, type } = values;

    let locations: any[] = [];

    if (location === 'all' && !type) {
      locations = await db.location.findMany();
      return locations;
    } else if (location === 'all' && type) {
      locations = await db.location.findMany({
        where: {
          type: type,
        },
      });
      return locations;
    }
    if (type === 'all' && location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      });
      return locations;
    } else if (type === 'all' && location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      });
      return locations;
    }
    if (type) {
      locations = await db.location.findMany({
        where: {
          type: type,
        },
      });
      return locations;
    } else if (location) {
      locations = await db.location.findMany({
        where: {
          city: location,
        },
      });
      return locations;
    } else if (location && type) {
      locations = await db.location.findMany({
        where: {
          city: location,
          type: type,
        },
      });
      return locations;
    } else {
      locations = await db.location.findMany();
    }

    if (locations.length === 0) {
      return null;
    }

    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};
