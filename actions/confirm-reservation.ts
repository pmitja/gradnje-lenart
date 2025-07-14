'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

export async function confirmReservation(id: string, clientId: string) {
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

    // Update the real estate status to 'Prodano' and link it to the client
    await db.realEstate.update({
      where: {
        id: reservation.realEstateId,
      },
      data: {
        status: StatusType.Prodano,
        clientId: clientId,
      },
    })

    // Delete the reservation
    await db.reservation.delete({
      where: {
        id: reservation.id,
      },
    })

    // Revalidate the dashboard page to refresh the data
    revalidatePath('/nadzorna-plosca')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Failed to confirm reservation:', error)
    return {
      success: false,
      error: 'Failed to confirm reservation',
    }
  }
}
