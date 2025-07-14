'use server'

import { db } from '@/lib/db'

export async function getAllClients() {
  return await db.client.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default getAllClients; 