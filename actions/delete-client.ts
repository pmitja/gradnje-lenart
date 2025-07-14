'use server'

import { db } from '@/lib/db'

export async function deleteClient(id: string) {
  return await db.client.delete({
    where: { id },
  })
}

export default deleteClient; 