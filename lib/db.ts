/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Using the singleton pattern for PrismaClient
const _prisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const db = _prisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') _prisma.prisma = db
