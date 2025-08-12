import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'USER' | 'ADMIN' | 'EMPLOYEE'
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: 'USER' | 'ADMIN' | 'EMPLOYEE'
  }
}
