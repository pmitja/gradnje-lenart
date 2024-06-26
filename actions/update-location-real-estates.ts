'use server';

import { mainFormSchema } from '@/schemas';
import { z } from 'zod';
import { db } from '@/lib/db';
import { StatusType } from '@/types/general';
import { RealEstate } from '@prisma/client';

const updateSchema = z.object({
  locationId: z.number(),
  apartments: z.array(
    z.object({
      number: z.string(),
      name: z.string(),
      floor: z.string(),
      size: z.number(),
      price: z.number(),
      priceWithTax: z.number(),
      status: z.nativeEnum(StatusType).optional(),
      images: z.array(z.string()).optional(), // Include any additional fields if necessary
    })
  ),
});

export const updateLocationRealEstate = async (
  values: z.infer<typeof updateSchema>
) => {
  const validatedFields = updateSchema.safeParse(values);
  console.log(validatedFields);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { apartments, locationId } = values;

  console.log(locationId);

  const location = await db.location.update({
    where: {
      id: locationId,
    },
    data: {
      realEstates: {
        upsert: apartments.map(
          (
            apartment: RealEstate & {
              id: string;
              description: string | null;
              locationId: string;
              slug: string;
              updatedAt: Date;
            }
          ) => ({
            where: { id: apartment.id },
            create: {
              id: apartment.id,
              name: apartment.name,
              description: '',
              number: apartment.number,
              floor: apartment.floor,
              size: apartment.size,
              priceWithTax: apartment.priceWithTax,
              price: apartment.price,
              images: apartment.images,
              status: apartment.status,
              slug: 'slug', // Generate slug
            },
            update: {
              name: apartment.name,
              description: '',
              floor: apartment.floor,
              size: apartment.size,
              priceWithTax: apartment.priceWithTax,
              price: apartment.price,
              images: apartment.images,
              status: apartment.status,
              slug: 'slug', // Generate slug
            },
          })
        ),
      },
    },
  });

  return { success: 'Nova lokacija je dodana!' };
};
