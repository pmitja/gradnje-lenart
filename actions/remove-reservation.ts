'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export async function removeReservation(id: string) {
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

    // Delete the reservation
    await db.reservation.delete({
      where: {
        id,
      },
    })

    // Update the real estate status back to 'Na prodaj'
    await db.realEstate.update({
      where: {
        id: reservation.realEstateId,
      },
      data: {
        status: StatusType.Prodaja,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Failed to remove reservation:', error)
    return {
      success: false, error: 'Failed to remove reservation',
    }
  }
}
