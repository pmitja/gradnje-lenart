'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { Tag, TagInput } from 'emblor'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { deleteUTFiles } from '@/actions/delete-from-uploadthing'
import Spinner from '@/components/common/spinner'
import CloseIcon from '@/components/icons/close'
import { Button } from '@/components/ui/button'
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from '@/components/ui/dialog'
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { useToast } from '@/components/ui/use-toast'
import { UploadButton } from '@/lib/utils/uploadthing'
import { formSchema } from '@/schemas'
import { EnergyClass, ExposedType, LocationType, SpacesType, StatusType } from '@/types/general'

// Simple interface definition to avoid linter issues
interface Props {
  saveFormValues: Function;
  nextNumber?: string;
  type: LocationType;
}

// Create a RequiredLabel component for required fields
const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <span className='flex items-center gap-1'>
    {children}
    <span className='text-destructive'>*</span>
  </span>
)

const ApartmentForm = ({ saveFormValues, nextNumber = '1', type }: Props) => {
  const [ open, setOpen ] = useState(false)

  const [ imagesBeginUploading, setImagesBeginUploading ] = useState(false)

  const [ filesBeginUploading, setFilesBeginUploading ] = useState(false)

  const [ uploadedImages, setUploadedImages ] = useState<string[]>([])

  const [ uploadedFiles, setUploadedFiles ] = useState<{ name: string; key: string }[]>([])

  const [ technicalData, setTechnicalData ] = useState<Tag[]>([])

  const [ activeTagIndex, setActiveTagIndex ] = useState<number | null>(null)

  const [ isPending, startTransition ] = useTransition()

  // Add toast functionality
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: nextNumber,
      name: '',
      floor: type === LocationType.Apartments ? '' : '1',
      size: 0,
      price: 0,
      priceWithTax: 0,
      status: StatusType.Prodaja,
      images: [],
      shortDescription: '',
      description: '',
      spaces: [],
      energyLevel: '',
      parkingSpaces: type === LocationType.Apartments ? 0 : undefined,
      technicalData: [],
      files: [],
      isExposed: false,
    },
  })

  // Effect to update floor value when type changes
  useEffect(() => {
    if (type === LocationType.House) {
      form.setValue('floor', '1')
    }
  }, [ type, form ])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Ensure required fields are present
    if (!values.name || !values.number || !values.size || !values.price
        || !values.priceWithTax || !values.shortDescription || !values.description) {
      // Show toast error instead of alert
      toast({
        variant: 'destructive',
        title: 'Manjkajoča polja',
        description: 'Prosim izpolnite vsa obvezna polja označena z *.',
      })
      return
    }

    // Ensure floor is set to '1' for houses
    const processedValues = {
      ...values,
    }

    if (type === LocationType.House) {
      processedValues.floor = '1'
    }

    // Ensure files is either an array or null, not undefined
    const hasFiles = Array.isArray(processedValues.files) && processedValues.files.length > 0

    const safeValues = {
      ...processedValues,
      files: hasFiles ? processedValues.files : null,
    }

    try {
      // Call the saveFormValues function passed to this component
      saveFormValues(safeValues)

      // Reset form values
      form.reset({
        number: String(Number(nextNumber) + 1), // Increment the apartment number
        name: '',
        floor: type === LocationType.Apartments ? '' : '1',
        size: 0,
        price: 0,
        priceWithTax: 0,
        status: StatusType.Prodaja,
        images: [],
        shortDescription: '',
        description: '',
        spaces: [],
        energyLevel: '',
        parkingSpaces: type === LocationType.Apartments ? 0 : undefined,
        technicalData: [],
        files: [],
        isExposed: false,
      })

      // Reset state values
      setUploadedImages([])
      setUploadedFiles([])
      setTechnicalData([])

      // Close the dialog
      setOpen(false)

      // Show confirmation toast instead of alert
      toast({
        title: 'Uspešno dodano',
        description: 'Stanovanje je bilo uspešno dodano.',
      })
    } catch (error) {
      // Show error toast instead of alert
      toast({
        variant: 'destructive',
        title: 'Napaka',
        description: 'Prišlo je do napake pri dodajanju stanovanja.',
      })
    }
  }

  const { setValue } = form

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

  const handleRemoveFile = (key: string) => async () => {
    startTransition(() => {
      deleteUTFiles([ key ]).then((res) => {
        if (res.success) {
          const filteredFiles = uploadedFiles.filter((file) => file.key !== key)

          setUploadedFiles(filteredFiles)
          setValue('files', filteredFiles)
        }
      })
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>Dodaj {type === LocationType.Apartments ? 'stanovanje' : 'hišo'}</Button>
      </DialogTrigger>
      <DialogContent className='max-h-screen w-full max-w-3xl overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Dodaj {type === LocationType.Apartments ? 'stanovanje' : 'hišo'}</DialogTitle>
          <DialogDescription>Prosim vnesite točne podatke o {type === LocationType.Apartments ? 'stanovanju' : 'hiši'}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='grid gap-4 py-4'
          >
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Št. {type === LocationType.Apartments ? 'stanovanja' : 'hiše'}</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='number'
                        className='col-span-3'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Naziv</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        className='col-span-3'
                        placeholder='2 sobno stanovanje'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='shortDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Kratki opis</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        className='col-span-3'
                        placeholder='Kratek opis stanovanja'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Opis</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        className='col-span-3'
                        placeholder='Podroben opis stanovanja'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {type === LocationType.Apartments && (
              <div className='grid grid-cols-1 items-center gap-4'>
                <FormField
                  control={form.control}
                  name='floor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RequiredLabel>Etaža</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='floor'
                          className='col-span-3'
                          placeholder='3. nadstropje'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {type === LocationType.House && (
              <input type="hidden" id="floor" value="1" />
            )}
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Kvadratura</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='size'
                        className='col-span-3'
                        type='number'
                        placeholder='70'
                        {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Cena (brez ddv)</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='price'
                        className='col-span-3'
                        type='number'
                        placeholder='100000'
                        {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='priceWithTax'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <RequiredLabel>Cena</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='priceWithTax'
                        className='col-span-3'
                        type='number'
                        placeholder='130000'
                        {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='spaces'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prostori</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type='multiple'
                        onValueChange={field.onChange}
                        className='flex flex-wrap gap-3'
                      >
                        {Object.values(SpacesType).map((space) => (
                          <FormItem
                            key={space}
                            className='rounded-md border border-primary-100'
                          >
                            <FormControl>
                              <ToggleGroupItem
                                value={space}
                                className='hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-300 data-[state=on]:text-white'
                              >
                                {space}
                              </ToggleGroupItem>
                            </FormControl>
                          </FormItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='energyLevel'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Energetski nivo</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type='single'
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-wrap gap-3'
                      >
                        {Object.values(EnergyClass).map((level) => (
                          <FormItem
                            className='rounded-md border border-primary-100'
                            key={level}
                          >
                            <FormControl>
                              <ToggleGroupItem
                                value={level}
                                className='hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-300 data-[state=on]:text-white'
                              >
                                {level}
                              </ToggleGroupItem>
                            </FormControl>
                          </FormItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {type === LocationType.Apartments && (
              <div className='grid grid-cols-1 items-center gap-4'>
                <FormField
                  control={form.control}
                  name='parkingSpaces'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Število parkirnih mest</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          id='parkingSpaces'
                          className='col-span-3'
                          {...field}
                          onChange={(event) => field.onChange(+event.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='technicalData'
                render={() => (
                  <FormItem>
                    <FormLabel>Tehnični podatki</FormLabel>
                    <FormControl>
                      <TagInput
                        activeTagIndex={activeTagIndex}
                        setActiveTagIndex={setActiveTagIndex}
                        placeholder='Vnesi tehnične podatke'
                        tags={technicalData}
                        className='sm:min-w-[450px]'
                        styleClasses={{
                          tag: {
                            body: 'bg-primary-300 rounded-md text-white hover:bg-primary-300/50',
                            closeButton: 'text-white hover:text-white',
                          },
                        }}
                        setTags={(newTags) => {
                          setTechnicalData(newTags)
                          setValue('technicalData', newTags as Array<Tag>)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type='single'
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-wrap gap-3'
                      >
                        {Object.values(StatusType).map((status) => (
                          <FormItem
                            className='rounded-md border border-primary-100'
                            key={status}
                          >
                            <FormControl>
                              <ToggleGroupItem
                                value={status}
                                className='hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-300 data-[state=on]:text-white'
                              >
                                {status}
                              </ToggleGroupItem>
                            </FormControl>
                          </FormItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='isExposed'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Izpostavi v posebni sekciji?</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type='single'
                        onValueChange={(e) => {
                          if (e === ExposedType.Expose.toString()) {
                            field.onChange(true)
                          } else {
                            field.onChange(false)
                          }
                        }}
                        className='flex flex-wrap gap-3'
                      >
                          <FormItem
                            className='rounded-md border border-primary-100'
                          >
                            <FormControl>
                              <ToggleGroupItem
                                value={ExposedType.Expose.toString()}
                                className='hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-300 data-[state=on]:text-white'
                              >
                                Izpostavi
                              </ToggleGroupItem>
                            </FormControl>
                          </FormItem>
                          <FormItem
                            className='rounded-md border border-primary-100'
                          >
                            <FormControl>
                              <ToggleGroupItem
                                value={ExposedType.Hide.toString()}
                                className='hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-300 data-[state=on]:text-white'
                              >
                                Ne izpostavi
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
            <div className='grid grid-cols-1 gap-4'>
              <FormLabel>Slike</FormLabel>
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
                  // Do something with the error.
                  toast({
                    variant: 'destructive',
                    title: 'Napaka pri nalaganju',
                    description: `${error.message}`,
                  })
                }}
                className='ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50'
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
            <div className='grid grid-cols-1 gap-4'>
              <FormLabel>Datoteke</FormLabel>
              <UploadButton
                endpoint='fileUpload'
                onUploadProgress={() => setFilesBeginUploading(true)}
                onClientUploadComplete={(res) => {
                  const array = res.map((file) => ({
                    name: file.name, key: file.key,
                  }))

                  setValue('files', array)
                  setUploadedFiles(array)
                  setFilesBeginUploading(false)
                }}
                onUploadError={(error: Error) => {
                  setFilesBeginUploading(false)
                  // Do something with the error.
                  toast({
                    variant: 'destructive',
                    title: 'Napaka pri nalaganju',
                    description: `${error.message}`,
                  })
                }}
                className='ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50'
              />
            </div>
            {!isPending
              && uploadedFiles.length > 0
              && uploadedFiles.map((file) => (
                <div className='relative flex max-w-fit items-center gap-3 rounded-md bg-primary-300 p-2 text-white' key={file.key}>
                  <div>{file.name}</div>
                  <Button
                    variant={'ghost'}
                    className='max-w-fit'
                    onClick={handleRemoveFile(file.key)}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              ))}
            {isPending && <Spinner />}
            <DialogFooter>
              <Button
                type='button'
                onClick={() => {
                  // Get the form values directly and validate them
                  const values = form.getValues()

                  // Run validation manually
                  form.trigger().then((isValid) => {
                    if (isValid) {
                      onSubmit(values)
                    } else {
                      toast({
                        variant: 'destructive',
                        title: 'Napaka pri validaciji',
                        description: 'Prosim izpolnite vsa obvezna polja označena z *.',
                      })
                    }
                  })
                }}
                disabled={
                  imagesBeginUploading
                  || filesBeginUploading
                  || form.formState.isSubmitting
                }
                variant={'form'}
              >
                Dodaj {type === LocationType.Apartments ? 'stanovanje' : 'hišo'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentForm
