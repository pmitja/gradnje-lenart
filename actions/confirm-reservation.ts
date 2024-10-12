'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export async function confirmReservation(id: string) {
  try {
    // Find the reservation
    const reservation = await db.reservation.findUnique({
      where: {
        id,
      },
      include: {
        realEstate: true,
      },
    })

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    // Update the real estate status to 'Prodano'
    await db.realEstate.update({
      where: {
        id: reservation.realEstateId,
      },
      data: {
        status: StatusType.Prodano,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Failed to confirm reservation:', error)
    return {
      success: false, error: 'Failed to confirm reservation',
    }
  }
}
