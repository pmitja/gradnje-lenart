'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { deleteUTFiles } from '@/actions/delete-from-uploadthing'
import { newLocation } from '@/actions/new-location'
import ApartmentForm from '@/components/common/apartment-form'
import Spinner from '@/components/common/spinner'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import CloseIcon from '@/components/icons/close'
import { Button } from '@/components/ui/button'
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from '@/components/ui/card'
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { UploadButton } from '@/lib/utils/uploadthing'
import { ProtectedNadzornaPlosca } from '@/routes'
import { mainFormSchema } from '@/schemas'
import { Apartment, LocationType, StatusType } from '@/types/general'

// Define a type that ensures files is always null for form submission
type ApartmentFormSubmission = Omit<Apartment, 'files'> & {
  files: null;
};

// Create a RequiredLabel component for required fields
const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <span className='flex items-center gap-1'>
    {children}
    <span className='text-destructive'>*</span>
  </span>
)

const NovAktualniProjektPage = () => {
  const { data: session } = useSession()

  const isAdmin = session?.user?.role === 'ADMIN'

  const router = useRouter()

  const [ apartments, setApartments ] = useState<ApartmentFormSubmission[]>([])

  const [ isPending, startTransition ] = useTransition()

  const [ error, setError ] = useState<string | undefined>('')

  const [ success, setSuccess ] = useState<string | undefined>('')

  // We only need to set this state but don't need to read it directly
  const [ , setUploadingImages ] = useState(false)

  const [ uploadedImages, setUploadedImages ] = useState<string[]>([])

  const form = useForm<z.infer<typeof mainFormSchema>>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      name: '',
      description: '',
      city: '',
      address: '',
      images: [],
      apartments: [],
      type: LocationType.Apartments,
      isActive: true,
    },
  })

  const { setValue, getValues } = form

  const saveFormValues = (values: Apartment) => {
    // Convert apartment to the required form submission format
    const apartmentForForm: ApartmentFormSubmission = {
      ...values,
      files: null,
      sobnost: values.sobnost ?? 1, // Ensure sobnost is always a number
    }

    const newApartments = [ ...apartments, apartmentForForm ]

    setApartments(newApartments)

    // Set the form value
    setValue('apartments', newApartments.map(a => ({
      ...a,
      sobnost: a.sobnost ?? 1, // Ensure sobnost is always a number
    })))
  }

  useEffect(() => {
    if (!isAdmin) {
      router.push('/nadzorna-plosca')
    }
  }, [ isAdmin, router ])

  if (!isAdmin) {
    return null // or a loading spinner
  }

  // Create a direct submit handler that doesn't rely on form.handleSubmit
  const handleManualSubmit = async () => {
    try {
      // Get current form values
      const formValues = getValues()

      setError('')
      setSuccess('')

      // Validate if at least one apartment is added
      if (!apartments || apartments.length === 0) {
        setError('Dodajte vsaj eno stanovanje.')
        return
      }

      // Validate required fields in the main form
      const requiredFields = {
        name: formValues.name,
        description: formValues.description,
        city: formValues.city,
        address: formValues.address,
      }

      const missingFields = Object.entries(requiredFields)
        .filter(([ , value ]) => !value)
        .map(([ key ]) => key)

      if (missingFields.length > 0) {
        setError(`Manjkajoča obvezna polja: ${missingFields.join(', ')}`)
        return
      }

      // Ensure apartments are properly set in form values
      formValues.apartments = apartments.map(a => ({
        ...a,
        sobnost: a.sobnost ?? 1, // Ensure sobnost is always a number
      }));

      // Start transition to show loading state
      startTransition(() => {
        newLocation(formValues)
          .then((data) => {
            if (data.error) {
              setError(data.error)
            } else {
              setSuccess(data.success)
              // Reset form and state after successful submission
              form.reset()
              setApartments([])
              setUploadedImages([])

              // Redirect back to dashboard after a short delay
              setTimeout(() => {
                router.push('/nadzorna-plosca')
              }, 2000)
            }
          })
          .catch(() => {
            setError('Prišlo je do nepričakovane napake. Prosimo, poskusite znova.')
          })
      })
    } catch (error) {
      setError('Prišlo je do napake pri obdelavi obrazca.')
    }
  }

  const handleRemoveImage = (image: string) => async () => {
    startTransition(() => {
      deleteUTFiles([ image ]).then((res) => {
        if (res.success) {
          const filteredImages = uploadedImages.filter((img) => img !== image)

          setUploadedImages(filteredImages)
          setValue('images', filteredImages)
        }
      })
    })
  }

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Form {...form}>
        <form
          className='space-y-8'
        >
          <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='icon'
                className='size-7'
              >
                <ProtectedNadzornaPlosca.Link>
                  <ChevronLeft className='size-4' />
                  <span className='sr-only'>Back</span>
                </ProtectedNadzornaPlosca.Link>
              </Button>
              <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-primary-300 sm:grow-0'>
                Dodajanje nove lokacije
              </h1>

              <div className='hidden items-center gap-2 md:ml-auto md:flex'>
                <Button
                  variant='outline'
                  size='sm'
                  type='button'
                  onClick={() => {
                    // Clear form and navigate back to dashboard
                    form.reset()
                    setApartments([])
                    setUploadedImages([])
                    router.push('/nadzorna-plosca')
                  }}
                >
                  Prekliči
                </Button>
                <Button
                  size='sm'
                  variant={'primary'}
                  className='border border-body-200'
                  type='button'
                  onClick={() => {
                    handleManualSubmit()
                  }}
                  disabled={isPending}
                >
                  {isPending ? 'Dodajanje...' : 'Dodaj lokacijo'}
                </Button>
              </div>
            </div>
            <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8'>
              <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-0'
                  className='bg-primary-75'
                >
                  <CardHeader>
                    <CardTitle>Osnovno</CardTitle>
                    <CardDescription>
                      Prosim vnesi vse zahtevane podatke za uspešno dodajanje nove lokacije.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><RequiredLabel>Naziv</RequiredLabel></FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='name'
                                  type='text'
                                  className='w-full'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='description'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><RequiredLabel>Opis</RequiredLabel></FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  id='description'
                                  className='min-h-32 w-full'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='city'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><RequiredLabel>Mesto</RequiredLabel></FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='city'
                                  type='text'
                                  className='w-full'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='address'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel><RequiredLabel>Naslov</RequiredLabel></FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='address'
                                  type='text'
                                  className='w-full'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid gap-3'>
                        <FormField
                          control={form.control}
                          name='type'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tip</FormLabel>
                              <FormControl>
                                <ToggleGroup
                                  type='single'
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className='flex flex-col gap-2'
                                >
                                  <FormItem>
                                    <FormControl>
                                      <ToggleGroupItem
                                        value={LocationType.House}
                                        className='bg-primary-50 hover:bg-body-50 hover:text-body-500 data-[state=on]:bg-body-300 data-[state=on]:text-primary-500'
                                      >
                                        {LocationType.House}
                                      </ToggleGroupItem>
                                    </FormControl>
                                  </FormItem>
                                  <FormItem>
                                    <FormControl>
                                      <ToggleGroupItem
                                        value={LocationType.Apartments}
                                        className='bg-primary-50 hover:bg-body-50 hover:text-body-500 data-[state=on]:bg-body-300 data-[state=on]:text-primary-500'
                                      >
                                        {LocationType.Apartments}
                                      </ToggleGroupItem>
                                    </FormControl>
                                  </FormItem>
                                </ToggleGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid gap-3'>
                        <UploadButton
                          endpoint='imageUploader'
                          onUploadProgress={() => setUploadingImages(true)}
                          onClientUploadComplete={(res) => {
                            const array = res.map((file) => file.key)

                            setValue('images', array)
                            setUploadedImages(array)
                            setUploadingImages(false)
                          }}
                          onUploadError={() => {
                            setUploadingImages(false)
                          }}
                          className='ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50 ut-button:ut-uploading:bg-primary-300'
                        />
                      </div>
                      {!isPending
                        && uploadedImages.length > 0
                        && uploadedImages.map((image) => (
                          <div className='relative max-w-fit' key={image}>
                            <Image
                              className='size-[200px] rounded-xl object-cover'
                              width={200}
                              height={200}
                              key={image}
                              src={`https://utfs.io/f/${image}`}
                              alt={image}
                            />
                            <Button
                              variant={'ghost'}
                              className='absolute right-2 top-2 max-w-fit bg-white/50'
                              onClick={handleRemoveImage(image)}
                            >
                              <CloseIcon />
                            </Button>
                          </div>
                        ))}
                      {isPending && <Spinner />}
                    </div>
                    <div className='grid gap-3'>
                      <FormField
                        control={form.control}
                        name='isActive'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type='single'
                                onValueChange={(value) => {
                                  if (value === 'Aktiven') {
                                    field.onChange(true)
                                  } else {
                                    field.onChange(false)
                                  }
                                }}
                                defaultValue={field.value === true ? 'Aktiven' : 'Neaktiven'}
                                className='flex flex-wrap gap-3'
                              >
                                <FormItem className='rounded-md border border-primary-100'>
                                  <FormControl>
                                    <ToggleGroupItem
                                      value={'Aktiven'}
                                      className='bg-primary-50 hover:bg-body-50 hover:text-body-500 data-[state=on]:bg-body-300 data-[state=on]:text-primary-500'
                                    >
                                      Aktiven
                                    </ToggleGroupItem>
                                  </FormControl>
                                </FormItem>
                                <FormItem className='rounded-md border border-primary-100'>
                                  <FormControl>
                                    <ToggleGroupItem
                                      value={'Neaktiven'}
                                      className='bg-primary-50 hover:bg-body-50 hover:text-body-500 data-[state=on]:bg-body-300 data-[state=on]:text-primary-500'
                                    >
                                      Neaktiven
                                    </ToggleGroupItem>
                                  </FormControl>
                                </FormItem>
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk='dashboard-07-chunk-1'
                  className='bg-primary-75'
                >
                  <CardHeader>
                    <CardTitle>{form.getValues('type') === LocationType.Apartments ? 'Stanovanja' : 'Hiše'}</CardTitle>
                    <CardDescription>
                      V tabeli so prikazana vse {form.getValues('type') === LocationType.Apartments ? 'stanovanja' : 'hiše'}, ki so trenutno dodana na lokacijo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Št. stanovanja</TableHead>
                          <TableHead>Naziv</TableHead>
                          {form.getValues('type') === LocationType.Apartments
                          && <TableHead>Etaža</TableHead>}
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
                            <TableRow key={apartment.number}>
                              <TableCell className='font-semibold'>{apartment.number}</TableCell>
                              <TableCell>{apartment.name}</TableCell>
                              {form.getValues('type') === LocationType.Apartments
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
                    <ApartmentForm saveFormValues={saveFormValues} type={form.getValues('type') as LocationType} />
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className='flex items-center justify-center gap-2 md:hidden'>
              <Button
                variant='outline'
                size='sm'
                type='button'
                onClick={() => {
                  // Clear form and navigate back to dashboard
                  form.reset()
                  setApartments([])
                  setUploadedImages([])
                  router.push('/nadzorna-plosca')
                }}
              >
                Prekliči
              </Button>
              <Button
                size='sm'
                type='button'
                onClick={() => {
                  handleManualSubmit()
                }}
                disabled={isPending}
              >
                {isPending ? 'Dodajanje...' : 'Dodaj lokacijo'}
              </Button>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </main>
  )
}

export default NovAktualniProjektPage
