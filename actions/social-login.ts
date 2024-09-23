'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/middleware-routes'

export const socialLogin = async (provider: string) => {
  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return {
      success: 'Logged in!',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            error: 'Invalid credentials',
          }
        }
        default: {
          return {
            error: 'An error occurred',
          }
        }
      }
    }
    throw error
  }
}
