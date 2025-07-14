'use client'

import { Calendar, Check, MapPin, User, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, startTransition } from 'react'
import { toast } from 'sonner'

import { confirmReservation } from '@/actions/confirm-reservation'
import { notifyWaitingList } from '@/actions/notify-waiting-list'
import { removeAllFromWaitingList } from '@/actions/remove-all-from-waiting-list'
import { removeReservation } from '@/actions/remove-reservation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import { newClient } from '@/actions/new-client'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { getAllClients } from '@/actions/get-all-clients'

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
    slug: string
  }
}

interface Client {
  id: string
  name: string
  surname: string
  email: string
}

interface ReservationsListProps {
  initialReservations: Reservation[]
  onReservationUpdated: () => void
  userRole?: string
}

const ReservationsList = ({ initialReservations, onReservationUpdated, userRole = 'USER' }: ReservationsListProps) => {
  const [ reservations, setReservations ] = useState(initialReservations)

  const [ selectedReservation, setSelectedReservation ] = useState<Reservation | null>(null)

  const [ viewType, setViewType ] = useState<'grid' | 'table'>('grid')

  const [ detailsOpen, setDetailsOpen ] = useState(false)
  const [ clients, setClients ] = useState<Client[]>([])
  const [ confirmDialogOpen, setConfirmDialogOpen ] = useState(false)
  const [ confirmReservationId, setConfirmReservationId ] = useState<string | null>(null)
  const [ selectedClientId, setSelectedClientId ] = useState<string>("")
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false)
  const [addClientLoading, setAddClientLoading] = useState(false)
  const addClientForm = useForm({
    defaultValues: {
      name: '',
      surname: '',
      address: '',
      phone: '',
      email: '',
      taxNumber: '',
      idNumber: '',
    },
  })

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(setClients)
  }, [])

  const isAdmin = userRole === 'ADMIN'

  const handleConfirmClick = (id: string) => {
    setConfirmReservationId(id)
    setSelectedClientId("")
    setConfirmDialogOpen(true)
  }

  const handleConfirm = async () => {
    if (!confirmReservationId || !selectedClientId) return
    const result = await confirmReservation(confirmReservationId, selectedClientId)
    if (result.success) {
      setReservations(reservations.filter((r) => r.id !== confirmReservationId))
      toast.success('Rezervacija potrjena', {
        description: 'Nepremičnina prodana izbranemu klientu.',
      })
      setConfirmDialogOpen(false)
      setConfirmReservationId(null)
      setSelectedClientId("")
      onReservationUpdated()
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
        const { id: realEstateId, name: realEstateName, slug } = removedReservation.realEstate

        // Notify waiting list
        const notificationResult = await notifyWaitingList(realEstateId, realEstateName, slug)

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

  const handleAddClient = async (values: any) => {
    setAddClientLoading(true)
    try {
      const client = await newClient(values)
      toast.success('Klient uspešno dodan.')
      setAddClientDialogOpen(false)
      
      startTransition(async () => {
        // Refresh clients and pre-select new client
        const updatedClients = await getAllClients()
        setClients(updatedClients)
        setSelectedClientId(client.id ?? "")
      })
      
      addClientForm.reset()
    } catch (e) {
      toast.error('Napaka pri dodajanju klienta.')
    } finally {
      setAddClientLoading(false)
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
                  <span className="line-clamp-1 text-lg text-secondary-300">{reservation.realEstate.name}</span>
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-sm font-normal text-primary-300">
                    #{reservation.realEstate.apartmentNumber}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {reservation.realEstate.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="size-3.5" />
                  <span className="font-medium">{reservation.fullName}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />
                  <span>{formatDate(reservation.createdAt)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-3">
                <Button variant="outline" size="sm" onClick={() => openDetails(reservation)}>
                  Podrobnosti
                </Button>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full bg-success-50 text-success-400 
                        hover:bg-success-100 hover:text-success-500"
                      onClick={() => handleConfirmClick(reservation.id)}
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full bg-destructive-50 text-destructive-400 
                        hover:bg-destructive-100 hover:text-destructive-500"
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
                            className="size-8 rounded-full bg-success-50 text-success-400 
                              hover:bg-success-100 hover:text-success-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleConfirmClick(reservation.id)
                            }}
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 rounded-full bg-destructive-50 text-destructive-400 
                              hover:bg-destructive-100 hover:text-destructive-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemove(reservation.id)
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
                    <div className="relative size-24 overflow-hidden rounded-md">
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
                      <p className="text-xl font-semibold">{selectedReservation.realEstate.name}</p>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {selectedReservation.realEstate.location}
                      </div>
                      <div className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 
                        text-sm text-primary-300">
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
                      handleRemove(selectedReservation.id)
                      setDetailsOpen(false)
                    }}
                  >
                    Odstrani rezervacijo
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleConfirmClick(selectedReservation.id)
                      setDetailsOpen(false)
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

      {/* Confirm Reservation Dialog */}
      {confirmDialogOpen && (
        <Dialog open={confirmDialogOpen} onOpenChange={(open) => setConfirmDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Potrditev rezervacije</DialogTitle>
              <DialogDescription>
                Izberite klienta, ki je kupil nepremičnino.
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4">
              <Label htmlFor="client-select" className="block mb-2">Klient</Label>
              <Select
                value={selectedClientId}
                onValueChange={setSelectedClientId}
              >
                <SelectTrigger id="client-select" className="mb-2">
                  <SelectValue placeholder="Izberi klienta" />
                </SelectTrigger>
                <SelectContent>
                  {clients.length === 0 ? (
                    <div className="p-2 text-muted-foreground">Ni klientov.</div>
                  ) : (
                    clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} {client.surname} ({client.email})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {clients.length === 0 && (
                <Button variant="outline" className="mt-2" onClick={() => setAddClientDialogOpen(true)}>
                  Dodaj novega klienta
                </Button>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                Prekliči
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={!selectedClientId}
              >
                Potrdi prodajo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Client Dialog */}
      <Dialog open={addClientDialogOpen} onOpenChange={setAddClientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj novega klienta</DialogTitle>
            <DialogDescription>Vnesite podatke o novem klientu.</DialogDescription>
          </DialogHeader>
          <Form {...addClientForm}>
            <form onSubmit={addClientForm.handleSubmit(handleAddClient)} className="space-y-3">
              <FormField
                control={addClientForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ime</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ime" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priimek</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Priimek" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naslov</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Naslov" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Telefon" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="taxNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Davčna številka</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Davčna številka" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addClientForm.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matična številka</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Matična številka" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" variant="primary" disabled={addClientLoading}>
                  Dodaj klienta
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Prekliči</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReservationsList
