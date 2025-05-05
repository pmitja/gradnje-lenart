import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const realEstates = await db.realEstate.findMany({
      where: {
        isExposed: true,
      },
      include: {
        location: {
          select: {
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(realEstates)
  } catch (error) {
    console.error('Error fetching real estates:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch real estates',
      },
      {
        status: 500,
      },
    )
  }
}
