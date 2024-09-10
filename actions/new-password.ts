'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { getPasswordResetToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { NewPasswordSchema } from '@/schemas'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return {
      error: 'Token is required!',
    }
  }

  const validateFields = NewPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { password } = validateFields.data

  const existingToken = await getPasswordResetToken(token)

  if (!existingToken) {
    return {
      error: 'Token does not exist!',
    }
  }

  const hasExpired = new Date() > new Date(existingToken.expiresAt)

  if (hasExpired) {
    return {
      error: 'Token has expired!',
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return {
    success: 'Password updated!',
  }
}
