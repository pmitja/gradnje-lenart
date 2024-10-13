import { db } from '@/lib/db'

export async function checkReservations() {
  const count = await db.reservation.count()

  console.log(`Total reservations in the database: ${count}`)
  return count
}
