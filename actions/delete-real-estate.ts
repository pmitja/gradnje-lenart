"use server"

import { db } from '@/lib/db'

export const deleteRealEstate = async (id: string) => {
  try {
    await db.realEstate.delete({
      where: { id },
    })
    return {
      success: 'Nepremičnina je bila uspešno izbrisana!',
    }
  } catch (error) {
    console.error('Napaka pri brisanju nepremičnine:', error)
    return {
      error: 'Prišlo je do napake pri brisanju nepremičnine.',
    }
  }
} 