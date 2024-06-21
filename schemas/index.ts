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
  'stevilka-stanovanja': z.string().min(1, {
    message: 'Vnesi številko ki je večja od nič, to polje je obvezno.',
  }),
  naziv: z.string().min(3, {
    message: 'Vnesi naziv ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  etaza: z.string().min(1, {
    message: 'Vnesi etazo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  kvadratura: z.string().min(1, {
    message: 'Vnesi kvadraturo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  'cena-brez-ddv': z.string().min(1, {
    message:
      'Vnesi ceno brez ddv ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  cena: z.string().min(1, {
    message: 'Vnesi ceno ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  status: z.nativeEnum(StatusType),
});

export const mainFormSchema = z.object({
  naziv: z.string().min(3, {
    message: 'Vnesi naziv ki je daljši od 3 znakov, to polje je obvezno.',
  }),
  opis: z.string().min(1, {
    message: 'Vnesi etazo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  mesto: z.string().min(1, {
    message: 'Vnesi kvadraturo ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  naslov: z.string().min(1, {
    message:
      'Vnesi ceno brez ddv ki je daljša od 3 znakov, to polje je obvezno.',
  }),
  stanovanja: z.array(formSchema).min(1, {
    message: 'Dodaj vsaj eno stanovanje.',
  }),
});