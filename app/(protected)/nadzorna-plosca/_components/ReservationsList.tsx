'use client'

import { ArrowUpRight, Calendar, Check, MapPin, MoreHorizontal, User, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { confirmReservation } from '@/actions/confirm-reservation'
import { notifyWaitingList } from '@/actions/notify-waiting-list'
import { removeAllFromWaitingList } from '@/actions/remove-all-from-waiting-list'
import { removeReservation } from '@/actions/remove-reservation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const [reservations, setReservations] = useState(initialReservations)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [viewType, setViewType] = useState<'grid' | 'table'>('grid')
  const [detailsOpen, setDetailsOpen] = useState(false)

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
      toast.error('Pri odstranitvi rezervacije je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  const openDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setDetailsOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-secondary-300">Rezervacije</h2>
          <p className="text-muted-foreground">Upravljajte rezervacije nepremičnin</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="grid" onValueChange={(value) => setViewType(value as 'grid' | 'table')}>
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="grid">Kartice</TabsTrigger>
              <TabsTrigger value="table">Tabela</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-40 w-full bg-muted">
                {reservation.realEstate.images?.[0] ? (
                  <Image
                    alt="Slika nepremičnine"
                    className="object-cover"
                    fill
                    src={`https://utfs.io/f/${reservation.realEstate.images[0]}`}
                  />
                ) : (
                  <Image
                    alt="Slika nepremičnine"
                    className="object-cover"
                    fill
                    src="/placeholder.svg"
                  />
                )}
              </div>
              <CardHeader className="p-4">
                <CardTitle className="flex justify-between">
                  <span className="text-lg text-secondary-300 line-clamp-1">{reservation.realEstate.name}</span>
                  <span className="text-sm font-normal text-primary-300 bg-primary-50 px-2 py-0.5 rounded-full">
                    #{reservation.realEstate.apartmentNumber}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {reservation.realEstate.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <div className="flex items-center text-sm text-muted-foreground gap-1 mb-2">
                  <User className="size-3.5" />
                  <span className="font-medium">{reservation.fullName}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <Calendar className="size-3.5" />
                  <span>{formatDate(reservation.createdAt)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-3 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => openDetails(reservation)}>
                  Podrobnosti
                </Button>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-success-50 text-success-400 hover:bg-success-100 hover:text-success-500"
                      onClick={() => handleConfirm(reservation.id)}
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-destructive-50 text-destructive-400 hover:bg-destructive-100 hover:text-destructive-500"
                      onClick={() => handleRemove(reservation.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nepremičnina</TableHead>
                  <TableHead>Lokacija</TableHead>
                  <TableHead>Ime in priimek</TableHead>
                  <TableHead>Datum rezervacije</TableHead>
                  <TableHead>
                    <span className="sr-only">Akcije</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id} className="cursor-pointer" onClick={() => openDetails(reservation)}>
                    <TableCell className="font-medium text-secondary-300">{reservation.realEstate.name}</TableCell>
                    <TableCell>{reservation.realEstate.location}</TableCell>
                    <TableCell>{reservation.fullName}</TableCell>
                    <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                    <TableCell>
                      {isAdmin && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-success-50 text-success-400 hover:bg-success-100 hover:text-success-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirm(reservation.id);
                            }}
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-destructive-50 text-destructive-400 hover:bg-destructive-100 hover:text-destructive-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(reservation.id);
                            }}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-end p-4">
            <div className="text-xs text-muted-foreground">
              Prikazano <strong>{reservations.length}</strong> rezervacij
            </div>
          </CardFooter>
        </Card>
      )}
      
      {/* Detailed Reservation Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedReservation && (
            <>
              <DialogHeader>
                <DialogTitle>Podrobnosti rezervacije</DialogTitle>
                <DialogDescription>
                  Podrobne informacije o izbrani rezervaciji
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-secondary-300">Podatki o nepremičnini</h3>
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-md">
                      {selectedReservation.realEstate.images?.[0] ? (
                        <Image
                          alt="Slika nepremičnine"
                          className="object-cover"
                          fill
                          src={`https://utfs.io/f/${selectedReservation.realEstate.images[0]}`}
                        />
                      ) : (
                        <Image
                          alt="Slika nepremičnine"
                          className="object-cover"
                          fill
                          src="/placeholder.svg"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-xl">{selectedReservation.realEstate.name}</p>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {selectedReservation.realEstate.location}
                      </div>
                      <div className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-sm text-primary-300">
                        Apartma #{selectedReservation.realEstate.apartmentNumber}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-secondary-300">Podatki o stranki</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Ime in priimek</p>
                      <p className="font-medium">{selectedReservation.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Datum rezervacije</p>
                      <p className="font-medium">{formatDate(selectedReservation.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">E-pošta</p>
                      <p className="font-medium">{selectedReservation.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="font-medium">{selectedReservation.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {isAdmin && (
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleRemove(selectedReservation.id);
                      setDetailsOpen(false);
                    }}
                  >
                    Odstrani rezervacijo
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      handleConfirm(selectedReservation.id);
                      setDetailsOpen(false);
                    }}
                  >
                    Potrdi rezervacijo
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReservationsList
