'use server'

import { db } from '@/lib/db'

export async function addToWaitlist(email: string, realEstateId: string) {
  try {
    await db.waitingListEntry.create({
      data: {
        email,
        realEstateId,
      },
    })
    return {
      success: true,
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return {
      success: false,
    }
  }
}
