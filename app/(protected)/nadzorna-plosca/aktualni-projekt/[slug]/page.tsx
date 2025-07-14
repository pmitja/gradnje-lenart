/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { finishProject } from '@/actions/finish-project'
import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import { reactivateProject } from '@/actions/reactivate-project'
import { updateLocationRealEstate } from '@/actions/update-location-real-estates'
import ApartmentForm from '@/components/common/apartment-form'
import EditApartmentDialog from '@/components/common/apartment-form/edit'
import Project404 from '@/components/containers/404/project-404'
import { Button } from '@/components/ui/button'
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { updateSchema } from '@/schemas'
import { Apartment, Location, LocationType, StatusType } from '@/types/general'
import { X } from 'lucide-react'
import { deleteRealEstate } from '@/actions/delete-real-estate'
import { Info, Save, Trash2, ArrowLeft, Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { use as usePromise } from 'react'

const AktualniProjektPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const router = useRouter()

  // Unwrap params Promise using use()
  const { slug } = usePromise(params)

  const { data: session } = useSession()

  const userRole = session?.user?.role || 'USER'

  const isAdmin = userRole === 'ADMIN'

  const [ apartments, setApartments ] = useState<Apartment[]>([])

  const [ isPending, startTransition ] = useTransition()

  const [ , setError ] = useState<string | undefined>('')

  const [ , setSuccess ] = useState<string | undefined>('')

  const [ location, setLocation ] = useState<Location | null>(null)

  const [ isError, setIsError ] = useState(false)

  const [ selectedApartment, setSelectedApartment ] = useState<Apartment | null>(null)

  const [ isFinishDialogOpen, setIsFinishDialogOpen ] = useState(false)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)

  const fetchLocationData = useCallback(() => {
    setIsError(false)
    startTransition(() => {
      getLocationRealEstates(slug).then((result) => {
        setLocation(result as Location | null)
        setApartments(result?.realEstates as unknown as Apartment[])
        if (!result) {
          setIsError(true)
        }
      })
    })
  }, [ slug ])

  useEffect(() => {
    fetchLocationData()
  }, [ fetchLocationData ])

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      apartments,
      locationSlug: slug,
    },
  })

  const { setValue } = form

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [
      ...prevApartments,
      {
        ...values,
        id: undefined,
        locationId: location?.id ?? undefined,
        slug: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        customerId: undefined,
        parkingSpaces: values.parkingSpaces === null ? undefined : values.parkingSpaces,
        images: values.images ?? [],
        technicalData: values.technicalData ?? [],
        spaces: values.spaces ?? [],
        files: values.files ?? null,
      },
    ])
  }

  useEffect(() => {
    if (apartments && apartments.length > 0) {
      setValue('apartments', apartments.map((apartment) => ({
        ...apartment,
        files: null,
        sobnost: apartment.sobnost ?? 1,
      })))
    }
  }, [ apartments, setValue ])

  function onSubmit(values: z.infer<typeof updateSchema>) {
    setError('')
    setSuccess('')
    console.log('Submitting values to updateLocationRealEstate:', values)
    startTransition(() => {
      updateLocationRealEstate(values).then((result) => {
        setError(result.error)
        setSuccess(result.success)
        if (result.error) {
          toast.error(result.error || 'Prišlo je do napake pri shranjevanju lokacije.')
        }
        if (result.success) {
          toast.success('Lokacija je bila uspešno shranjena!', {
            description: 'Vse spremembe so bile shranjene.'
          })
          fetchLocationData() // Refresh apartments after successful update
        }
      })
    })
  }

  const handleApartmentEdit = (apartment: Apartment) => {
    if (isAdmin) {
      setSelectedApartment(apartment)
    }
  }

  const handleEditCancel = () => {
    setSelectedApartment(null)
    // fetchLocationData() removed to prevent overwriting local apartments state
  }

  const handleFinishProject = async () => {
    const finishResult = await finishProject(slug)
    if (finishResult.success) {
      toast.success('Projekt je bil uspešno zaključen!', {
        description: 'Vse nepremičnine so prodane.'
      })
      setIsFinishDialogOpen(false)
      setTimeout(() => {
        router.push('/nadzorna-plosca')
      }, 2000)
    } else if (finishResult.error === 'Not all real estates are sold') {
      toast.error(`Projekta ni mogoče zaključiti. Obstaja še ${finishResult.unsoldCount} neprodanih nepremičnin na tej lokaciji.`, {
        description: 'Prosimo, poskusite znova.'
      })
    } else {
      toast.error(finishResult.error || 'Pri zaključevanju projekta je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.'
      })
    }
  }

  const handleReactivateProject = async () => {
    const reactivateResult = await reactivateProject(slug)
    if (reactivateResult.success) {
      toast.success('Projekt je bil ponovno aktiviran!', {
        description: 'Lokacija je zdaj označena kot aktivna.'
      })
      setIsFinishDialogOpen(false)
      fetchLocationData()
    } else {
      toast.error(reactivateResult.error || 'Pri ponovni aktivaciji projekta je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.'
      })
    }
  }

  return (
    <main className="flex flex-1 flex-col min-h-screen">
      <TooltipProvider>
      {!isPending && location && (
        <div className="flex flex-1 justify-center items-start w-full h-full">
          <div className="w-full max-w-7xl px-4 py-8 flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                asChild
                aria-label="Nazaj na nadzorno ploščo"
              >
                <Link href="/nadzorna-plosca">
                  <ArrowLeft className="size-5" />
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight text-primary-300 sm:grow-0">
                {location.name}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {isAdmin && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchLocationData()}
                    >
                      Prekliči
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      className="border border-body-200 flex items-center gap-2"
                      onClick={() => onSubmit({
                        apartments: apartments.map((apartment) => ({
                          ...apartment,
                          files: apartment.files || null,
                          parkingSpaces: apartment.parkingSpaces === null ? undefined : apartment.parkingSpaces,
                          sobnost: apartment.sobnost ?? 1,
                        })),
                        locationSlug: location.slug,
                      })}
                    >
                      <Save className="w-4 h-4 mr-1" /> Posodobi lokacijo
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-2 lg:gap-10">
              <div className="grid auto-rows-max items-start gap-8 lg:col-span-2 lg:gap-10">
                <Card x-chunk="dashboard-07-chunk-1" className="bg-primary-75 shadow-md border border-primary-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {location.type === LocationType.Apartments ? 'Stanovanja' : 'Hiše'}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {location.type === LocationType.Apartments
                            ? 'V tabeli so prikazana vsa stanovanja, ki so trenutno dodana na lokacijo.'
                            : 'V tabeli so prikazana vse hiše, ki so trenutno dodane na lokacijo.'}
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                    <CardDescription>
                      {location.type === LocationType.Apartments
                        ? 'V tabeli so prikazana vsa stanovanja, ki so trenutno dodana na lokacijo.'
                        : 'V tabeli so prikazana vse hiše, ki so trenutno dodane na lokacijo.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-primary-50">
                          <TableHead className="rounded-tl-lg">Št. {location.type === LocationType.Apartments ? 'stanovanja' : 'hiše'}</TableHead>
                          <TableHead>Naziv</TableHead>
                          {location.type === LocationType.Apartments && <TableHead>Etaža</TableHead>}
                          <TableHead className="text-right">Kvadratura</TableHead>
                          <TableHead className="text-right">Cena (brez ddv)</TableHead>
                          <TableHead className="text-right">Cena</TableHead>
                          <TableHead>Status</TableHead>
                          {isAdmin && <TableHead className="rounded-tr-lg"></TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apartments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={isAdmin ? 8 : 7} className="text-center py-8 text-muted-foreground">
                              Ni dodanih nepremičnin.
                            </TableCell>
                          </TableRow>
                        ) : (
                          apartments
                            .sort((a, b) => Number(a.number) - Number(b.number))
                            .map((apartment) => (
                              <TableRow
                                key={apartment.number}
                                className={
                                  isAdmin
                                    ? 'cursor-pointer hover:bg-primary-100/60 transition-colors'
                                    : ''
                                }
                                onClick={() => isAdmin && !deleteDialogOpen && handleApartmentEdit(apartment)}
                              >
                                <TableCell className="font-semibold">{apartment.number}</TableCell>
                                <TableCell>{apartment.name}</TableCell>
                                {location.type === LocationType.Apartments && (
                                  <TableCell>{apartment.floor}. nadstropje</TableCell>
                                )}
                                <TableCell className="text-right">{apartment.size} m²</TableCell>
                                <TableCell className="text-right">{apartment.price} €</TableCell>
                                <TableCell className="text-right">{apartment.priceWithTax} €</TableCell>
                                <TableCell>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div
                                        className={
                                          "size-4 rounded-full border " +
                                          (apartment.status === StatusType.Prodaja
                                            ? "bg-green-400 border-green-600"
                                            : apartment.status === StatusType.Rezervirano
                                            ? "bg-yellow-400 border-yellow-600"
                                            : apartment.status === StatusType.Prodano
                                            ? "bg-red-400 border-red-600"
                                            : "bg-gray-300 border-gray-400")
                                        }
                                        aria-label={
                                          apartment.status === StatusType.Prodaja
                                            ? "Na prodaj"
                                            : apartment.status === StatusType.Rezervirano
                                            ? "Rezervirano"
                                            : apartment.status === StatusType.Prodano
                                            ? "Prodano"
                                            : "Neznano"
                                        }
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {apartment.status === StatusType.Prodaja && 'Na prodaj'}
                                      {apartment.status === StatusType.Rezervirano && 'Rezervirano'}
                                      {apartment.status === StatusType.Prodano && 'Prodano'}
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                                {isAdmin && (
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setDeleteDialogOpen(apartment.id || '')
                                      }}
                                      aria-label="Izbriši nepremičnino"
                                      className="p-1 h-7 w-7 text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Find the next available number
                                        const maxNumber = apartments.reduce((max, a) => {
                                          const num = Number(a.number)
                                          return !isNaN(num) && num > max ? num : max
                                        }, 0)
                                        const nextNumber = String(maxNumber + 1)
                                        // Duplicate the apartment
                                        const duplicated = {
                                          ...apartment,
                                          id: undefined,
                                          slug: undefined,
                                          createdAt: undefined,
                                          updatedAt: undefined,
                                          customerId: undefined,
                                          files: apartment.files ?? null,
                                          number: nextNumber,
                                        }
                                        setApartments((prev) => [...prev, duplicated])
                                        toast.success('Nepremičnina je bila uspešno podvojena!', {
                                          description: `Nova nepremičnina ima številko ${nextNumber}.`,
                                        })
                                      }}
                                      aria-label="Podvoji nepremičnino"
                                      className="p-1 h-7 w-7 text-primary-500 hover:bg-primary-100"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                    <Dialog open={deleteDialogOpen === apartment.id} onOpenChange={(open) => {
                                      if (!open) setDeleteDialogOpen(null)
                                    }}>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Izbriši nepremičnino</DialogTitle>
                                          <DialogDescription>
                                            Ali ste prepričani, da želite izbrisati to nepremičnino? To dejanje je nepovratno.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                          <Button variant="secondary" onClick={() => setDeleteDialogOpen(null)}>Prekliči</Button>
                                          <Button
                                            variant="destructive"
                                            onClick={async () => {
                                              setDeleteDialogOpen(null)
                                              if (!apartment.id) return
                                              const result = await deleteRealEstate(apartment.id)
                                              if (result?.success) {
                                                toast.success(result.success)
                                                fetchLocationData()
                                              } else {
                                                toast.error(result?.error || 'Prišlo je do napake pri brisanju nepremičnine.')
                                              }
                                            }}
                                          >
                                            Izbriši
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </TableCell>
                                )}
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-6 bg-primary-50 rounded-b-lg">
                    {isAdmin && (
                      <ApartmentForm
                        saveFormValues={saveFormValues}
                        nextNumber={apartments.length > 0 ? String(Number(apartments[apartments.length - 1].number) + 1) : '1'}
                        type={location.type}
                      />
                    )}
                  </CardFooter>
                </Card>
              </div>
              {isAdmin && (
                <div className="grid auto-rows-max items-start gap-8 lg:gap-10">
                  <Card x-chunk="dashboard-07-chunk-5" className="bg-primary-75 shadow-md border border-primary-100">
                    <CardHeader>
                      <CardTitle>{location.isActive ? 'Zaključi projekt' : 'Ponovno aktiviraj projekt'}</CardTitle>
                      <CardDescription>
                        {location.isActive
                          ? 'Projekt je razprodan. Zaključi projekt, da lokacija ne bo več vidna v nadzorni plošči.'
                          : 'Ponovno aktiviraj projekt, da lokacija ponovno postane vidna v nadzorni plošči.'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Dialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:!bg-primary-50 hover:!text-primary-300 w-full"
                          >
                            {location.isActive ? 'Zaključi projekt' : 'Ponovno aktiviraj projekt'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{location.isActive ? 'Zaključi projekt' : 'Ponovno aktiviraj projekt'}</DialogTitle>
                            <DialogDescription>
                              {location.isActive
                                ? 'Ali ste prepričani, da želite zaključiti ta projekt? To dejanje bo označilo lokacijo kot neaktivno.'
                                : 'Ali ste prepričani, da želite ponovno aktivirati ta projekt? To dejanje bo označilo lokacijo kot aktivno.'}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsFinishDialogOpen(false)}>Prekliči</Button>
                            <Button variant="primary" onClick={location.isActive ? handleFinishProject : handleReactivateProject}>
                              {location.isActive ? 'Zaključi projekt' : 'Ponovno aktiviraj projekt'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
            {isAdmin && selectedApartment && !deleteDialogOpen && (
              <EditApartmentDialog
                apartment={selectedApartment}
                id={selectedApartment.id ?? ''}
                isAdmin={isAdmin}
                onCancel={handleEditCancel}
                onSuccess={() => {
                  setSelectedApartment(null);
                  fetchLocationData();
                }}
                type={location.type}
              />
            )}
          </div>
        </div>
      )}
      {isPending && (
        <div className="mx-auto flex min-h-dvh items-center justify-center gap-4">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      {isError && <Project404 />}
      </TooltipProvider>
    </main>
  )
}

export default AktualniProjektPage
