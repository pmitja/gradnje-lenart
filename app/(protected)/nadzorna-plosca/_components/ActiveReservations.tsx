import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserIcon, CalendarIcon, MapPinIcon, HomeIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import ReservationsList from './ReservationsList'

interface Reservation {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: Date
  realEstate: {
    id: string
    name: string
    location: string
    apartmentNumber: string
    number: string | null
    images: string[]
  }
}

interface ActiveReservationsProps {
  reservations: Reservation[]
  onReservationUpdated: () => void
  userRole?: string
}

export default function ActiveReservations(
  { reservations, onReservationUpdated, userRole = 'USER' }: ActiveReservationsProps,
) {
  const isAdmin = userRole === 'ADMIN'
  const [showAllReservations, setShowAllReservations] = useState(false)

  return (
    <>
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold text-secondary-300">Rezervacije</CardTitle>
            <CardDescription>Nedavne rezervacije nepremičnin.</CardDescription>
          </div>
          {reservations.length > 0 && (
            <Button 
              variant="outline" 
              className="border-primary-100 text-primary-300 hover:bg-primary-50 hover:text-primary-400"
              onClick={() => setShowAllReservations(true)}
            >
              Prikaži vse
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          {reservations.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center space-y-2 rounded-lg p-6">
              <CalendarIcon className="h-10 w-10 text-muted-foreground opacity-40" />
              <p className="text-center text-muted-foreground">Trenutno ni novih rezervacij.</p>
            </div>
          ) : (
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-100 before:via-primary-200 before:to-transparent">
              {reservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="relative flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-75 shadow-sm">
                    <HomeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                        {reservation.realEstate.images?.[0] ? (
                          <Image
                            alt="Slika nepremičnine"
                            className="object-cover"
                            fill
                            src={`https://utfs.io/f/${reservation.realEstate.images[0]}`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <HomeIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-secondary-300">{reservation.realEstate.name}</span>
                              <Badge variant="outline" className="ml-1 bg-primary-50 px-1.5 py-0 text-xs font-normal text-primary-300">
                                #{reservation.realEstate.apartmentNumber}
                              </Badge>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPinIcon className="h-3 w-3" />
                              <span>{reservation.realEstate.location}</span>
                            </div>
                          </div>
                          <time className="text-xs text-muted-foreground">{formatDate(reservation.createdAt)}</time>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <UserIcon className="h-3.5 w-3.5" />
                          <span>{reservation.fullName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showAllReservations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="max-h-[90vh] h-full w-full overflow-hidden rounded-lg bg-white max-w-[50%]">
            <div className="p-4 flex flex-col justify-between h-full">
              <ReservationsList
                initialReservations={reservations}
                onReservationUpdated={() => {
                  onReservationUpdated();
                  setShowAllReservations(false);
                }}
                userRole={userRole}
              />
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowAllReservations(false)}>
                  Zapri
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
