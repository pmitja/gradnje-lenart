import { useState } from 'react'

import { confirmReservation } from '@/actions/confirm-reservation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'

import ReservationsList from './ReservationsList'

interface Reservation {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: Date
  realEstate: {
    name: string
    location: string
    apartmentNumber: string
    number: string | null
    images: string[]
  }
}

interface ActiveReservationsProps {
  reservations: Reservation[]
  onReservationConfirmed: () => void
}

export default function ActiveReservations(
  { reservations: initialReservations, onReservationConfirmed }: ActiveReservationsProps,
) {
  const [ reservations, setReservations ] = useState(initialReservations)

  const handleConfirm = async (id: string) => {
    const result = await confirmReservation(id)

    if (result.success) {
      setReservations(reservations.filter((r) => r.id !== id))
      onReservationConfirmed()
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Rezervacije</CardTitle>
          <CardDescription>Nedavne rezervacije nepremičnin.</CardDescription>
        </div>
        {reservations.length > 0 && <ReservationsList initialReservations={reservations} />}
      </CardHeader>
      <CardContent>
        {reservations.length === 0 ? (
          <p className="text-center text-muted-foreground">Trenutno ni novih rezervacij.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stranka</TableHead>
                <TableHead className="hidden xl:table-cell">Nepremičnina</TableHead>
                <TableHead className="text-right">Čas rezervacije</TableHead>
                <TableHead>Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.slice(0, 5).map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div className="font-medium">{reservation.fullName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {reservation.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {reservation.realEstate.location}
                  </TableCell>
                  <TableCell className="text-right">{formatDate(reservation.createdAt)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleConfirm(reservation.id)}>Potrdi prodajo</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
