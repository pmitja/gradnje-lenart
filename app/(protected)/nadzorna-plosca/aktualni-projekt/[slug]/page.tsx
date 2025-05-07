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

const AktualniProjektPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()

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

  const fetchLocationData = useCallback(() => {
    setIsError(false)
    startTransition(() => {
      getLocationRealEstates(params.slug).then((result) => {
        setLocation(result as Location | null)
        setApartments(result?.realEstates as unknown as Apartment[])
        if (!result) {
          setIsError(true)
        }
      })
    })
  }, [ params.slug ])

  useEffect(() => {
    fetchLocationData()
  }, [ fetchLocationData ])

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      apartments,
      locationSlug: params.slug,
    },
  })

  const { setValue } = form

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [ ...prevApartments, values ])
  }

  useEffect(() => {
    if (apartments && apartments.length > 0) {
      setValue('apartments', apartments.map((apartment) => ({
        ...apartment,
        files: null,
      })))
    }
  }, [ apartments, setValue ])

  function onSubmit(values: z.infer<typeof updateSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      updateLocationRealEstate(values).then((result) => {
        setError(result.error)
        setSuccess(result.success)
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
    fetchLocationData() // Revalidate path to get latest location real estates
  }

  const handleFinishProject = async () => {
    const result = await finishProject(params.slug)

    if (result.success) {
      toast.success('Projekt zaključen', {
        description: 'Vse nepremičnine so prodane.',
      })
      setIsFinishDialogOpen(false)
      // Redirect to the dashboard page after a short delay
      setTimeout(() => {
        router.push('/nadzorna-plosca')
      }, 2000) // 2 second delay
    } else if (result.error === 'Not all real estates are sold') {
      toast.error(`Projekta ni mogoče zaključiti. Obstaja še ${result.unsoldCount} neprodanih nepremičnin na tej lokaciji.`, {
        description: 'Prosimo, poskusite znova.',
      })
    } else {
      toast.error(result.error || 'Pri zaključevanju projekta je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  const handleReactivateProject = async () => {
    const result = await reactivateProject(params.slug)

    if (result.success) {
      toast.success('Projekt ponovno aktiviran', {
        description: 'Lokacija je zdaj označena kot aktivna.',
      })
      setIsFinishDialogOpen(false)
      fetchLocationData() // Refresh the location data
    } else {
      toast.error(result.error || 'Pri ponovni aktivaciji projekta je prišlo do napake.', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      {!isPending && location && (
        <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              className='size-7'
              asChild
            >
              <Link href="/nadzorna-plosca">
                <ChevronLeft className='size-4' />
                <span className='sr-only'>Back</span>
              </Link>
            </Button>
            <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-primary-300 sm:grow-0'>
              {location.name}
            </h1>
            <div className='hidden items-center gap-2 md:ml-auto md:flex'>
              {isAdmin && (
                <>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    Prekliči
                  </Button>
                  <Button
                    size='sm'
                    variant={'primary'}
                    className='border border-body-200'
                    onClick={() => onSubmit({
                      apartments: apartments.map((apartment) => ({
                        ...apartment,
                        files: apartment.files || null,
                      })),
                      locationSlug: location.slug,
                    })}
                  >
                    Posodobi lokacijo
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8'>
            <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
              <Card
                x-chunk='dashboard-07-chunk-1'
                className='bg-primary-75'
              >
                <CardHeader>
                  <CardTitle>{location.type === LocationType.Apartments ? 'Stanovanja' : 'Hiše'}</CardTitle>
                  <CardDescription>
                    {location.type === LocationType.Apartments ? 'V tabeli so prikazana vsa stanovanja, ki so trenutno dodana na lokacijo.' : 'V tabeli so prikazana vse hiše, ki so trenutno dodane na lokacijo.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Št. {location.type === LocationType.Apartments ? 'stanovanja' : 'hiše'}</TableHead>
                        <TableHead>Naziv</TableHead>
                        {location.type === LocationType.Apartments && <TableHead>Etaža</TableHead>}
                        <TableHead>Kvadratura</TableHead>
                        <TableHead>Cena (brez ddv)</TableHead>
                        <TableHead>Cena</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apartments
                        .sort((a, b) => Number(a.number) - Number(b.number))
                        .map((apartment) => (
                          <TableRow
                            key={apartment.number}
                            className={isAdmin ? 'cursor-pointer hover:bg-primary-100' : ''}
                            onClick={() => isAdmin && handleApartmentEdit(apartment)}
                          >
                            <TableCell className='font-semibold'>{apartment.number}</TableCell>
                            <TableCell>{apartment.name}</TableCell>
                            {location.type === LocationType.Apartments
                            && <TableCell>{apartment.floor}. nadstropje</TableCell>}
                            <TableCell>{apartment.size} m2</TableCell>
                            <TableCell>{apartment.price} €</TableCell>
                            <TableCell>{apartment.priceWithTax} €</TableCell>
                            <TableCell>
                              {apartment.status === StatusType.Prodaja && (
                                <div className='size-4 rounded-full bg-green-400'></div>
                              )}
                              {apartment.status === StatusType.Rezervirano && (
                                <div className='size-4 rounded-full bg-yellow-400'></div>
                              )}
                              {apartment.status === StatusType.Prodano && (
                                <div className='size-4 rounded-full bg-red-400'></div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className='justify-center border-t p-4'>
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
              <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-5'
                  className='bg-primary-75'
                >
                  <CardHeader>
                    <CardTitle>{location.isActive ? 'Zaključi projekt' : 'Ponovno aktiviraj projekt'}</CardTitle>
                    <CardDescription>
                      {location.isActive
                        ? 'Projekt je razprodan. Zaključi projekt, da lokacija ne bo več vidna v nadzorni plosci.'
                        : 'Ponovno aktiviraj projekt, da lokacija ponovno postane vidna v nadzorni plosci.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          className='hover:!bg-primary-50 hover:!text-primary-300'
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
          <div className='flex items-center justify-center gap-2 md:hidden'>
            <Button
              variant='outline'
              size='sm'
            >
              Discard
            </Button>
            <Button size='sm'>Save Product</Button>
          </div>
          {isAdmin && selectedApartment && (
            <EditApartmentDialog
              apartment={selectedApartment}
              id={selectedApartment.id ?? ''}
              isAdmin={isAdmin}
              onCancel={handleEditCancel}
              type={location.type}
            />
          )}
        </div>
      )}
      {isPending && (
        <div className='mx-auto flex min-h-dvh'>
          <span className='loading loading-ball loading-xs'></span>
          <span className='loading loading-ball loading-sm'></span>
          <span className='loading loading-ball loading-md'></span>
          <span className='loading loading-ball loading-lg'></span>
        </div>
      )}
      {isError && <Project404 />}
    </main>
  )
}

export default AktualniProjektPage
