/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { finishProject } from '@/actions/finish-project'
import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
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
import { toast } from '@/components/ui/use-toast'
import { updateSchema } from '@/schemas'
import { Apartment, Location, StatusType } from '@/types/general'

const AktualniProjektPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter()

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
    setApartments((prevApartments) => [ ...prevApartments, values ])
  }

  useEffect(() => {
    setValue('apartments', apartments.map((apartment) => ({
      ...apartment,
      files: null,
    })))
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
    setSelectedApartment(apartment)
  }

  const handleEditCancel = () => {
    setSelectedApartment(null)
    fetchLocationData() // Revalidate path to get latest location real estates
  }

  const handleFinishProject = async () => {
    const result = await finishProject(slug)

    if (result.success) {
      toast({
        title: 'Projekt zaključen',
        description: 'Projekt je bil uspešno zaključen. Vse nepremičnine so prodane.',
        variant: 'default',
      })
      setIsFinishDialogOpen(false)
      // Redirect to the dashboard page after a short delay
      setTimeout(() => {
        router.push('/nadzorna-plosca')
      }, 2000) // 2 second delay
    } else if (result.error === 'Not all real estates are sold') {
      toast({
        title: 'Napaka',
        description: `Projekta ni mogoče zaključiti. Obstaja še ${result.unsoldCount} neprodanih nepremičnin na tej lokaciji.`,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Napaka',
        description: result.error || 'Pri zaključevanju projekta je prišlo do napake.',
        variant: 'destructive',
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
            >
              <Link href={'/nadzorna-plosca'}>
                <ChevronLeft className='size-4' />
                <span className='sr-only'>Back</span>
              </Link>
            </Button>
            <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-primary-300 sm:grow-0'>
              {location.name}
            </h1>
            <div className='hidden items-center gap-2 md:ml-auto md:flex'>
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
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8'>
            <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
              <Card
                x-chunk='dashboard-07-chunk-1'
                className='bg-primary-75'
              >
                <CardHeader>
                  <CardTitle>Stanovanja</CardTitle>
                  <CardDescription>
                    V tabeli so prikazana vsa apartments, ki so trenutno dodana na lokacijo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Št. apartments</TableHead>
                        <TableHead>Naziv</TableHead>
                        <TableHead>Etaža</TableHead>
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
                            className="cursor-pointer hover:bg-primary-100"
                            onClick={() => handleApartmentEdit(apartment)}
                          >
                            <TableCell className='font-semibold'>{apartment.number}</TableCell>
                            <TableCell>{apartment.name}</TableCell>
                            <TableCell>{apartment.floor}. nadstropje</TableCell>
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
                  <ApartmentForm
                    saveFormValues={saveFormValues}
                    nextNumber={apartments.length > 0 ? String(Number(apartments[apartments.length - 1].number) + 1) : '1'}
                  />
                </CardFooter>
              </Card>
            </div>
            <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
              <Card
                x-chunk='dashboard-07-chunk-5'
                className='bg-primary-75'
              >
                <CardHeader>
                  <CardTitle>Projekt razprodan in zaključen</CardTitle>
                  <CardDescription>
                    Projekt je razprodan in zaključen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <Dialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size='sm'
                        variant='outline'
                        className='hover:!bg-primary-50 hover:!text-primary-300'
                      >
                        Zaključi projekt
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Zaključi projekt</DialogTitle>
                        <DialogDescription>
                          Ali ste prepričani, da želite zaključiti ta projekt?
                          To dejanje bo označilo lokacijo kot neaktivno.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsFinishDialogOpen(false)}>Prekliči</Button>
                        <Button variant="primary" onClick={handleFinishProject}>Zaključi projekt</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
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
          {selectedApartment && (
            <EditApartmentDialog
              apartment={selectedApartment}
              id={selectedApartment.id}
              onCancel={handleEditCancel}
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
