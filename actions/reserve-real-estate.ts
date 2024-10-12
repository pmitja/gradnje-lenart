'use server'

import { db } from '@/lib/db'
import { StatusType } from '@/types/general'

interface ReservationData {
  fullName: string
  email: string
  phoneNumber: string
  realEstateId: string
}

export async function reserveRealEstate(data: ReservationData) {
  try {
    // Create a new reservation
    const reservation = await db.reservation.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        realEstate: {
          connect: {
            id: data.realEstateId,
          },
        },
      },
    })

    // Update the real estate status to 'Reserved'
    await db.realEstate.update({
      where: {
        id: data.realEstateId,
      },
      data: {
        status: StatusType.Rezervirano,
      },
    })

    return {
      success: true, reservation,
    }
  } catch (error) {
    console.error('Failed to reserve real estate:', error)
    return {
      success: false, error: 'Failed to reserve real estate',
    }
  }
}
