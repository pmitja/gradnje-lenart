'use client'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Apartment, Location, StatusType } from '@/types/general'
import { updateSchema } from '@/schemas'
import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import Project404 from '@/components/containers/404/project-404'
import Link from 'next/link'
import { updateLocationRealEstate } from '@/actions/update-location-real-estates'
import ApartmentForm from '@/components/common/apartment-form'

const AktualniProjektPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [location, setLocation] = useState<Location | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
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
  }, [])

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      apartments: apartments,
      locationSlug: slug
    }
  })

  const { setValue } = form

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, values])
  }

  useEffect(() => {
    setValue('apartments', apartments)
  }, [apartments])

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

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      {!isPending && location && (
        <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7'
            >
              <Link href={'/nadzorna-plosca'}>
                <ChevronLeft className='h-4 w-4' />
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
                onClick={() => onSubmit({ apartments, locationSlug: location.slug })}
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
                        .map((apartment, index) => (
                          <TableRow key={apartment.number}>
                            <TableCell className='font-semibold'>{apartment.number}</TableCell>
                            <TableCell>{apartment.name}</TableCell>
                            <TableCell>{apartment.floor}. nadstropje</TableCell>
                            <TableCell>{apartment.size} m2</TableCell>
                            <TableCell>{apartment.price} €</TableCell>
                            <TableCell>{apartment.priceWithTax} €</TableCell>
                            <TableCell>
                              {apartment.status === StatusType.Prodaja && (
                                <div className='h-4 w-4 rounded-full bg-green-400'></div>
                              )}
                              {apartment.status === StatusType.Rezervirano && (
                                <div className='h-4 w-4 rounded-full bg-yellow-400'></div>
                              )}
                              {apartment.status === StatusType.Prodano && (
                                <div className='h-4 w-4 rounded-full bg-red-400'></div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className='justify-center border-t p-4'>
                  <ApartmentForm saveFormValues={saveFormValues} />
                </CardFooter>
              </Card>
            </div>
            <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
              <Card
                x-chunk='dashboard-07-chunk-5'
                className='bg-primary-75'
              >
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <Button
                    size='sm'
                    variant='secondary'
                  >
                    Archive Product
                  </Button>
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
        </div>
      )}
      {isPending && (
        <div className='mx-auto flex min-h-[100dvh]'>
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
