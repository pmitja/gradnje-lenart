import { db } from '@/lib/db'

export async function checkReservations() {
  const count = await db.reservation.count()

  return count
}
