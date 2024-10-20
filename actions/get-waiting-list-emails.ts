'use server'

import { db } from '@/lib/db'

export async function getWaitingListEmails(realEstateId: string) {
  try {
    const waitingListEntries = await db.waitingListEntry.findMany({
      where: {
        realEstateId,
      },
      select: {
        email: true,
      },
    })

    return waitingListEntries.map((entry) => entry.email)
  } catch (error) {
    console.error('Error fetching waiting list emails:', error)
    return []
  }
}
