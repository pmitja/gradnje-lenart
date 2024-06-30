'use server';

import { db } from '@/lib/db';
import { generateSlugWithNumber } from '@/lib/helpers';
import { updateSchema } from '@/schemas';
import { z } from 'zod';

export const updateLocationRealEstate = async (
  values: z.infer<typeof updateSchema>
) => {
  const validatedFields = updateSchema.safeParse(values);

  console.log('Validated Fields:', validatedFields);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }
  console.log(values)
  const { apartments, locationSlug } = values;

  console.log(apartments, locationSlug)

  const location = await db.location.findUnique({
    where: {
      slug: locationSlug
    }
  })

  console.log(location)

  if (!location) {
    return { error: 'Location not found' };
  }

  try {
    await Promise.all(
      apartments.map(async (apartment) => {
        if (apartment.id) {
          console.log('Updating apartment:', apartment);
          await db.realEstate.update({
            where: { id: apartment.id },
            data: {
              name: apartment.name,
              number: apartment.number,
              floor: apartment.floor,
              size: apartment.size,
              price: apartment.price,
              priceWithTax: apartment.priceWithTax,
              status: apartment.status,
            },
          });
        } else {
          console.log('Creating new apartment:', apartment);
          await db.realEstate.create({
            data: {
              name: apartment.name,
              number: apartment.number,
              floor: apartment.floor,
              size: apartment.size,
              priceWithTax: apartment.priceWithTax,
              price: apartment.price,
              locationId: location.id,
              slug: generateSlugWithNumber(location.slug, apartment.number),
              status: apartment.status,
            },
          });
        }
      })
    );
    return { success: 'Nova lokacija je dodana!' };
  } catch (error) {
    console.error('Error updating/creating apartments:', error);
    return { error: 'An error occurred while updating/creating apartments' };
  }
};
