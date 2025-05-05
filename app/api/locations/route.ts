import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const locations = await db.location.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        realEstates: {
          select: {
            id: true,
          },
        },
      },
    })

    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch locations',
      },
      {
        status: 500,
      },
    )
  }
}
