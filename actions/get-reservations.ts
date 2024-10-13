import { db } from '@/lib/db'

export async function getReservations() {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        realEstate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return reservations
  } catch (error) {
    console.error('Failed to fetch reservations:', error)
    return []
  }
}
