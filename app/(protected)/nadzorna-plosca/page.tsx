'use client'

import { useCallback, useEffect, useState } from 'react'

import { getLocationCounts } from '@/actions/get-location-counts'
import { getReservations } from '@/actions/get-reservations'
import { getSoldApartmentsCount } from '@/actions/get-sold-apartments-count'

import ActiveReservations from './_components/ActiveReservations'
import LocationCount from './_components/LocationCount'
import RecentSales from './_components/RecentSales'
import ReservationsSummary from './_components/ReservationsSummary'

interface Reservation {
  realEstate: {
    location: string;
    apartmentNumber: string;
    number: string | null;
    name: string;
    images: string[];
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

const UserPage = () => {
  const [ reservations, setReservations ] = useState<Reservation[]>([])

  const [ reservationsCount, setReservationsCount ] = useState(0)

  const [ activeLocations, setActiveLocations ] = useState(0)

  const [ inactiveLocations, setInactiveLocations ] = useState(0)

  const [ soldApartmentsCount, setSoldApartmentsCount ] = useState(0)

  const fetchData = useCallback(async () => {
    const fetchedReservations = await getReservations()

    setReservations(fetchedReservations)
    setReservationsCount(fetchedReservations.length)

    const { activeLocations, inactiveLocations } = await getLocationCounts()

    setActiveLocations(activeLocations)
    setInactiveLocations(inactiveLocations)

    const soldCount = await getSoldApartmentsCount()

    setSoldApartmentsCount(soldCount)
  }, [])

  useEffect(() => {
    fetchData()
  }, [ fetchData ])

  const handleReservationConfirmed = () => {
    fetchData()
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold">Dobrodošli na nadzorni plošči</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <ReservationsSummary reservationsCount={reservationsCount} />
          <LocationCount title="Aktivne lokacije" count={activeLocations} />
          <LocationCount title="Neaktivne lokacije" count={inactiveLocations} />
          <LocationCount title="Prodana stanovanja" count={soldApartmentsCount} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <ActiveReservations
            reservations={reservations}
            onReservationConfirmed={handleReservationConfirmed}
          />
          <RecentSales />
        </div>
      </main>
    </div>
  )
}

export default UserPage
