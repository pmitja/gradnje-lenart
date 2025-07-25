'use client'

import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { getDashboardData } from '@/actions/get-dashboard-data'

import ActiveReservations from './_components/ActiveReservations'
import LocationCount from './_components/LocationCount'
import RecentSales from './_components/RecentSales'
import ReservationsSummary from './_components/ReservationsSummary'

interface Reservation {
  realEstate: {
    id: string;
    location: string;
    apartmentNumber: string;
    number: string | null;
    name: string;
    images: string[];
    slug: string;
  };
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  realEstateId: string;
  customerId: string | null;
}

interface Sale {
  id: string
  name: string
  priceWithTax: number | null
  updatedAt: Date
  customer: {
    fullName: string
    email: string
  } | null
  location: {
    name: string
  }
}

interface DashboardData {
  reservations: Reservation[];
  reservationsCount: number;
  activeLocations: number;
  inactiveLocations: number;
  soldApartmentsCount: number;
  recentSales: Sale[];
}

const UserPage = () => {
  const { data: session } = useSession()

  const userRole = session?.user?.role || 'USER'

  const [ dashboardData, setDashboardData ] = useState<DashboardData>({
    reservations: [],
    reservationsCount: 0,
    activeLocations: 0,
    inactiveLocations: 0,
    soldApartmentsCount: 0,
    recentSales: [],
  })

  const fetchData = useCallback(async () => {
    const data = await getDashboardData()

    setDashboardData(data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [ fetchData ])

  const handleReservationUpdated = useCallback(() => {
    fetchData()
  }, [ fetchData ])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold">Dobrodošli na nadzorni plošči</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <ReservationsSummary reservationsCount={dashboardData.reservationsCount} />
          <LocationCount title="Aktivne lokacije" count={dashboardData.activeLocations} />
          <LocationCount title="Neaktivne lokacije" count={dashboardData.inactiveLocations} />
          <LocationCount title="Prodana stanovanja" count={dashboardData.soldApartmentsCount} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <ActiveReservations
            reservations={dashboardData.reservations}
            onReservationUpdated={handleReservationUpdated}
            userRole={userRole}
          />
          <RecentSales sales={dashboardData.recentSales} />
        </div>
      </main>
    </div>
  )
}

export default UserPage
