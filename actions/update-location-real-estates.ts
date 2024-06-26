"use server"

import { mainFormSchema } from "@/schemas"
import { z } from "zod"
import { db } from '@/lib/db'
import { StatusType } from "@/types/general"


const updateSchema = z.object({
  apartments: z.array(z.object({
    number: z.string(),
    name: z.string(),
    floor: z.string(),
    size: z.number(),
    price: z.number(),
    priceWithTax: z.number(),
    status: z.nativeEnum(StatusType).optional(),
    images: z.array(z.string()).optional(), // Include any additional fields if necessary
  }))
});

export const updateLocationRealEstate = async (values: z.infer<typeof updateSchema>) => {
  console.log(values);
  const validatedFields = updateSchema.safeParse(values);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  return { success: 'Nova lokacija je dodana!' };
};
