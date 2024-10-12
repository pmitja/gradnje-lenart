import { db } from '@/lib/db'

export async function getReservations() {
  try {
    const reservations = await db.reservation.findMany({
      include: {
        realEstate: {
          select: {
            name: true,
            images: true,
            location: {
              select: {
                name: true,
              },
            },
            number: true, // This corresponds to apartmentNumber
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return reservations.map((reservation) => ({
      ...reservation,
      realEstate: {
        ...reservation.realEstate,
        location: reservation.realEstate.location.name,
        apartmentNumber: reservation.realEstate.number || '',
      },
    }))
  } catch (error) {
    console.error('Failed to fetch reservations:', error)
    return []
  }
}
