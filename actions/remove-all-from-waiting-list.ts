'use server'

import { db } from '@/lib/db'

export async function removeAllFromWaitingList(realEstateId: string) {
  try {
    // Delete all waiting list entries for the given real estate ID
    await db.waitingListEntry.deleteMany({
      where: {
        realEstateId,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error removing waiting list entries:', error)
    return {
      success: false, error: 'Failed to remove waiting list entries',
    }
  }
}
