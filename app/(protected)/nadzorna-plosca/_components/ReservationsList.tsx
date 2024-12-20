'use client'

import { ArrowUpRight, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { confirmReservation } from '@/actions/confirm-reservation'
import { notifyWaitingList } from '@/actions/notify-waiting-list'
import { removeAllFromWaitingList } from '@/actions/remove-all-from-waiting-list'
import { removeReservation } from '@/actions/remove-reservation'
import { Button } from '@/components/ui/button'
import { Card,
  CardContent,
  CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'

interface Reservation {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: Date
  realEstate: {
    id: string
    name: string
    images?: string[]
    location: string
    apartmentNumber: string
  }
}

interface ReservationsListProps {
  initialReservations: Reservation[]
  onReservationUpdated: () => void
  userRole?: string
}

const ReservationsList = ({ initialReservations, onReservationUpdated, userRole = 'USER' }: ReservationsListProps) => {
  const [ reservations, setReservations ] = useState(initialReservations)

  const isAdmin = userRole === 'ADMIN'

  const handleConfirm = async (id: string) => {
    const result = await confirmReservation(id)

    if (result.success) {
      setReservations(reservations.filter((r) => r.id !== id))
      toast.success('Rezervacija potrjena', {
        description: 'Kontaktirali vas bomo za potrditev.',
      })
      onReservationUpdated() // Call the callback
    } else {
      toast.error('Pri potrditvi rezervacije je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  const handleRemove = async (id: string) => {
    const result = await removeReservation(id)

    if (result.success) {
      setReservations(reservations.filter((r) => r.id !== id))
      toast.success('Rezervacija odstranjena')
      onReservationUpdated() // Call the callback

      // Get the real estate ID for the removed reservation
      const removedReservation = reservations.find((r) => r.id === id)

      if (removedReservation) {
        const { id: realEstateId, name: realEstateName } = removedReservation.realEstate

        // Notify waiting list
        const notificationResult = await notifyWaitingList(realEstateId, realEstateName)

        if (notificationResult.success) {
          toast.success('Obvestila poslana čakalni listi')

          // Remove all entries from the waiting list for this real estate
          const removeWaitingListResult = await removeAllFromWaitingList(realEstateId)

          if (removeWaitingListResult.success) {
            toast.success('Čakalna lista za to nepremičnino je bila izpraznjena')
          } else {
            toast.error('Napaka pri praznjenju čakalne liste')
          }
        } else {
          toast.error('Napaka pri pošiljanju obvestil čakalni listi')
        }
      }
    } else {
      toast.error('Pri odstranitvi rezervacije je prišlo do napake. Prosimo, poskusite znova.', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'primary'} size="sm" className="ml-auto gap-1" disabled={!isAdmin}>
          Prikaži vse
          <ArrowUpRight className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex size-3/4 max-h-screen max-w-full flex-col overflow-y-auto bg-white">
        <DialogHeader className="max-h-fit">
          <DialogTitle>Vse rezervacije</DialogTitle>
          <DialogDescription>
            Pregled vseh aktivnih rezervacij
          </DialogDescription>
        </DialogHeader>
        <Card className="size-full bg-primary-50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <span className="sr-only">Slika</span>
                    </TableHead>
                    <TableHead>Nepremičnina</TableHead>
                    <TableHead>Lokacija</TableHead>
                    <TableHead>Št. apartmaja</TableHead>
                    <TableHead>Ime in priimek</TableHead>
                    <TableHead>E-pošta</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Datum rezervacije</TableHead>
                    <TableHead>
                      <span className="sr-only">Akcije</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        {reservation.realEstate.images?.[0] && <Image
                          alt="Slika nepremičnine"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={`https://utfs.io/f/${reservation.realEstate.images?.[0]}` || '/placeholder.svg'}
                          width="64"
                        />}
                        {!reservation.realEstate.images?.[0] && <Image
                          alt="Slika nepremičnine"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={'/placeholder.svg'}
                          width="64"
                        />}
                      </TableCell>
                      <TableCell className="font-medium">{reservation.realEstate.name}</TableCell>
                      <TableCell>{reservation.realEstate.location}</TableCell>
                      <TableCell>{reservation.realEstate.apartmentNumber}</TableCell>
                      <TableCell>{reservation.fullName}</TableCell>
                      <TableCell>{reservation.email}</TableCell>
                      <TableCell>{reservation.phoneNumber}</TableCell>
                      <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                      <TableCell>
                        {isAdmin && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild className='hover:!bg-primary-75 hover:!text-white'>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Odpri meni</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Akcije</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleConfirm(reservation.id)} className='hover:!bg-primary-75 hover:!text-white'>
                                Potrdi
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRemove(reservation.id)} className='hover:!bg-primary-75 hover:!text-white'>
                                Odstrani
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <div className="text-xs text-muted-foreground">
              Prikazano <strong>{reservations.length}</strong> rezervacij
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationsList
