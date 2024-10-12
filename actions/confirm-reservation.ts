'use server'

import { revalidatePath } from 'next/cache'

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

    // Create a new Customer based on the reservation data
    const customer = await db.customer.create({
      data: {
        fullName: reservation.fullName,
        email: reservation.email,
        phoneNumber: reservation.phoneNumber,
      },
    })

    // Update the real estate status to 'Prodano' and link it to the customer
    await db.realEstate.update({
      where: {
        id: reservation.realEstateId,
      },
      data: {
        status: StatusType.Prodano,
        customerId: customer.id,
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
