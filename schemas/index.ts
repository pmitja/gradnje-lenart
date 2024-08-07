import { StatusType } from '@/types/general';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required.'
  }),
  password: z.string().min(1, {
    message: 'Password is required.'
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required.'
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.'
  }),
  name: z.string().min(1, {
    message: 'Name is required.'
  }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required.'
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.'
  }),
});

export const formSchema = z.object({
  number: z.string().min(1, {
    message: 'Vnesi številko ki je večja od nič, to polje je obvezno.',
  }),
  name: z.string().min(3, {
    message: 'Vnesi naziv ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  floor: z.string().min(1, {
    message: 'Vnesi etazo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  size: z.number().min(1, {
    message: 'Vnesi kvadraturo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  price: z.number().min(1, {
    message:
      'Vnesi ceno brez ddv ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  priceWithTax: z.number().min(1, {
    message: 'Vnesi ceno ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  status: z.nativeEnum(StatusType),
  id: z.string().optional(),
  images: z.array(z.string()).optional(),
  shortDescription: z.string().min(1, {
    message: 'Vnesi opis ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  description: z.string().min(1, {
    message: 'Vnesi opis ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  spaces: z.array(z.string()).optional(),
  energyLevel: z.string().optional(),
  parkingSpaces: z.number().optional(),
  technicalData: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ).optional(),
  files: z.array(z.string()).optional(),
});

export const mainFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Vnesi naziv ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  description: z.string().min(1, {
    message: 'Vnesi etazo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  city: z.string().min(1, {
    message: 'Vnesi kvadraturo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  address: z.string().min(1, {
    message:
      'Vnesi ceno brez ddv ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  apartments: z.array(formSchema).min(1, {
    message: 'Dodaj vsaj eno stanovanje.',
  }),
  images: z.array(z.string()).optional(),
  type: z.string(),
  isActive: z.boolean().optional(),
});

export const updateSchema = z.object({
  apartments: z.array(formSchema).min(1, {
    message: 'Dodaj vsaj eno stanovanje.',
  }),
  locationSlug: z.string(),
});