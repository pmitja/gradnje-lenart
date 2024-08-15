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

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { newLocation } from '@/actions/new-location'
import { Apartment, LocationType, StatusType } from '@/types/general'
import { formSchema, mainFormSchema } from '@/schemas'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import Link from 'next/link'
import { UploadButton } from '@/lib/utils/uploadthing'
import Image from 'next/image'
import CloseIcon from '@/components/icons/close'
import { deleteUTFiles } from '@/actions/delete-from-uploadthing'
import Spinner from '@/components/common/spinner'
import ApartmentForm from '@/components/common/apartment-form'

const NovAktualniProjektPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [imagesBeginUploading, setImagesBeginUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof mainFormSchema>>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      name: '',
      description: '',
      city: '',
      address: '',
      images: [],
      apartments: apartments,
      type: LocationType.Apartments,
      isActive: true
    }
  })

  const { setValue } = form

  const saveFormValues = (values: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, values])
  }

  useEffect(() => {
    setValue('apartments', apartments)
  }, [apartments])

  function onSubmit(values: z.infer<typeof mainFormSchema>) {
    setError('')
    setSuccess('')

    startTransition(() => {
      newLocation(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
    form.reset()
  }

  const handleRemoveImage = (image: string) => async () => {
    startTransition(() => {
      deleteUTFiles([image]).then((res) => {
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
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
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
                Dodajanje nove lokacije
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
                  type='submit'
                >
                  Dodaj lokacijo
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
                              <FormLabel>Naziv</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='name'
                                  type='text'
                                  className='w-full'
                                  defaultValue='Več stanovanjski objekt'
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
                              <FormLabel>Opis</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  id='description'
                                  className='min-h-32 w-full'
                                  defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.'
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
                              <FormLabel>Mesto</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='city'
                                  type='text'
                                  className='w-full'
                                  defaultValue='Lenart'
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
                              <FormLabel>Naslov</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='address'
                                  type='text'
                                  className='w-full'
                                  defaultValue='Jurovska cesta 14'
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
                          onUploadProgress={() => setImagesBeginUploading(true)}
                          onClientUploadComplete={(res) => {
                            const array = res.map((file) => file.key)
                            setValue('images', array)
                            setUploadedImages(array)
                            setImagesBeginUploading(false)
                          }}
                          onUploadError={(error: Error) => {
                            setImagesBeginUploading(false)
                          }}
                          className='ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50 ut-button:ut-uploading:bg-primary-300'
                        />
                      </div>
                      {!isPending &&
                        uploadedImages.length > 0 &&
                        uploadedImages.map((image) => (
                          <div className='relative max-w-fit'>
                            <Image
                              className='h-[200px] w-[200px] rounded-xl object-cover'
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
                            <FormLabel>Tip</FormLabel>
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
                    <CardTitle>Stanovanja</CardTitle>
                    <CardDescription>
                      V tabeli so prikazana vsa stanovanja, ki so trenutno dodana na lokacijo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Št. stanovanja</TableHead>
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
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </main>
  )
}

export default NovAktualniProjektPage
