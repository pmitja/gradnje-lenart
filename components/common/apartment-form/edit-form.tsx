'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { Tag, TagInput } from 'emblor'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { deleteUTFiles } from '@/actions/delete-from-uploadthing'
import { updateRealEstate } from '@/actions/update-real-estate'
import Spinner from '@/components/common/spinner'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import CloseIcon from '@/components/icons/close'
import { Button } from '@/components/ui/button'
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
import { Apartment, EnergyClass, ExposedType, LocationType, SpacesType, StatusType } from '@/types/general'

const EditApartmentForm = ({ data, onCancel, id = '', type, onSuccess }: {
  data: Apartment,
  onCancel: () => void,
  id?: string,
  type: LocationType,
  onSuccess?: () => void // Add onSuccess prop
}) => {
  const [ imagesBeginUploading, setImagesBeginUploading ] = useState(false)

  const [ filesBeginUploading, setFilesBeginUploading ] = useState(false)

  const [ uploadedImages, setUploadedImages ] = useState<string[]>(data.images ?? [])

  // eslint-disable-next-line max-len
  const [ uploadedFiles, setUploadedFiles ] = useState<{ name: string; key: string }[]>(
    data.files ?? [],
  )

  const [ technicalData, setTechnicalData ] = useState<Tag[]>(data.technicalData as Tag[])

  const [ activeTagIndex, setActiveTagIndex ] = useState<number | null>(null)

  const [ error, setError ] = useState<string | undefined>('')

  const [ success, setSuccess ] = useState<string | undefined>('')

  const [ isPending, startTransition ] = useTransition()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: data.number,
      name: data.name,
      floor: type === LocationType.Apartments ? data.floor : '1',
      size: data.size,
      price: data.price,
      priceWithTax: data.priceWithTax,
      status: data.status,
      images: data.images,
      shortDescription: data.shortDescription,
      description: data.description,
      spaces: data.spaces,
      energyLevel: data.energyLevel,
      parkingSpaces: type === LocationType.Apartments ? data.parkingSpaces : undefined,
      technicalData: data.technicalData,
      files: data.files,
      isExposed: data.isExposed,
      sobnost: data.sobnost,
    },
  })

  // Effect to ensure floor is set to '1' for houses
  useEffect(() => {
    if (type === LocationType.House) {
      form.setValue('floor', '1')
    }
  }, [ type, form ])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError('')
    setSuccess('')

    // Ensure floor is set to '1' for houses
    const processedValues = {
      ...values,
    }

    if (type === LocationType.House) {
      processedValues.floor = '1'
    }

    startTransition(() => {
      const updatedValues = {
        apartment: processedValues,
        locationId: id,
      }

      updateRealEstate(updatedValues).then((result) => {
        setError(result.error)
        setSuccess(result.success)
        if (result.success) {
          toast({
            title: 'Nepremičnina uspešno posodobljena!',
            description: 'Vse spremembe so bile shranjene.',
            variant: 'default',
          })
          if (onSuccess) onSuccess()
        }
        if (result.error) {
          toast({
            title: 'Prišlo je do napake pri posodabljanju nepremičnine.',
            description: result.error,
            variant: 'destructive',
          })
        }
      })
    })
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
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 py-2">
        {/* Section: Osnovni podatki */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Osnovni podatki</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* number, name */}
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Št. {type === LocationType.Apartments ? 'stanovanja' : 'hiše'}</FormLabel>
                  <FormControl>
                    <Input id="number" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naziv</FormLabel>
                  <FormControl>
                    <Input id="name" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kratki opis</FormLabel>
                  <FormControl>
                    <Textarea id="shortDescription" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea id="description" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {type === LocationType.Apartments && (
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etaža</FormLabel>
                    <FormControl>
                      <Input id="floor" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {type === LocationType.House && (
              <input type="hidden" id="floor" value="1" />
            )}
          </div>
        </div>
        {/* Section: Lastnosti */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Lastnosti</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kvadratura</FormLabel>
                  <FormControl>
                    <Input id="size" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === LocationType.Apartments && (
              <FormField
                control={form.control}
                name="sobnost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of rooms</FormLabel>
                    <FormControl>
                      <ToggleGroup type="single" value={field.value?.toString()} onValueChange={val => field.onChange(val ? parseFloat(val) : undefined)} className="flex flex-wrap gap-3">
                        {[1, 1.5, 2, 2.5, 3].map(option => (
                          <ToggleGroupItem key={option} value={option.toString()} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
                            {option}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena (brez ddv)</FormLabel>
                  <FormControl>
                    <Input id="price" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="priceWithTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena</FormLabel>
                  <FormControl>
                    <Input id="priceWithTax" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === LocationType.Apartments && (
              <FormField
                control={form.control}
                name="parkingSpaces"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Število parkirnih mest</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} id="parkingSpaces" className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="spaces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prostori</FormLabel>
                  <FormControl>
                    <ToggleGroup type="multiple" value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-3">
                      {Object.values(SpacesType).map((space) => (
                        <FormItem key={space} className="rounded-md border border-primary-100">
                          <FormControl>
                            <ToggleGroupItem value={space} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
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
            <FormField
              control={form.control}
              name="energyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energetski nivo</FormLabel>
                  <FormControl>
                    <ToggleGroup type="single" onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-3">
                      {Object.values(EnergyClass).map((level) => (
                        <FormItem className="rounded-md border border-primary-100" key={level}>
                          <FormControl>
                            <ToggleGroupItem value={level} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="technicalData"
              render={() => (
                <FormItem>
                  <FormLabel>Tehnični podatki</FormLabel>
                  <FormControl>
                    <TagInput
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                      placeholder="Vnesi tehnične podatke"
                      tags={technicalData}
                      className="sm:min-w-[350px] rounded-lg border-gray-300 focus:ring-2 focus:ring-primary-300"
                      styleClasses={{
                        tag: {
                          body: 'bg-primary-400 rounded-md text-white hover:bg-primary-300/50',
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
        </div>
        {/* Section: Status & Izpostavljenost */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Status & Izpostavljenost</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <ToggleGroup type="single" onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-3">
                      {Object.values(StatusType).map((status) => (
                        <FormItem className="rounded-md border border-primary-100" key={status}>
                          <FormControl>
                            <ToggleGroupItem value={status} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
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
            <FormField
              control={form.control}
              name="isExposed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Izpostavi v posebni sekciji?</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value === true ? ExposedType.Expose.toString() : ExposedType.Hide.toString()}
                      onValueChange={(e) => {
                        if (e === ExposedType.Expose.toString()) {
                          field.onChange(true)
                        } else {
                          field.onChange(false)
                        }
                      }}
                      className="flex flex-wrap gap-3"
                    >
                      <FormItem className="rounded-md border border-primary-100">
                        <FormControl>
                          <ToggleGroupItem value={ExposedType.Expose.toString()} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
                            Izpostavi
                          </ToggleGroupItem>
                        </FormControl>
                      </FormItem>
                      <FormItem className="rounded-md border border-primary-100">
                        <FormControl>
                          <ToggleGroupItem value={ExposedType.Hide.toString()} className="hover:bg-primary-50 hover:text-primary-500 data-[state=on]:bg-primary-400 data-[state=on]:text-white rounded-md px-4 py-2 transition-all">
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
        </div>
        {/* Section: Naloži slike in datoteke */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Naloži slike in datoteke</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel>Slike</FormLabel>
              <UploadButton
                endpoint="imageUploader"
                onUploadProgress={() => setImagesBeginUploading(true)}
                onClientUploadComplete={(res) => {
                  const newImages = res.map((file) => file.key)
                  const updatedImages = [ ...uploadedImages, ...newImages ]
                  setValue('images', updatedImages)
                  setUploadedImages(updatedImages)
                  setImagesBeginUploading(false)
                }}
                onUploadError={(error: Error) => {
                  setImagesBeginUploading(false)
                  toast({ variant: 'destructive', title: 'Napaka pri nalaganju', description: error.message })
                }}
                className="ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50 mt-2"
              />
              {!isPending && uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {uploadedImages.map((image) => (
                    <div className="relative max-w-fit rounded-lg border border-gray-200 shadow-sm" key={image}>
                      <Image className="size-[140px] rounded-lg object-cover" width={140} height={140} key={image} src={`https://utfs.io/f/${image}`} alt={image} />
                      <Button variant={'ghost'} className="absolute right-2 top-2 max-w-fit bg-white/70 rounded-full p-1" onClick={handleRemoveImage(image)} size="icon">
                        <CloseIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {isPending && <Spinner />}
            </div>
            <div>
              <FormLabel>Datoteke</FormLabel>
              <UploadButton
                endpoint="fileUpload"
                onUploadProgress={() => setFilesBeginUploading(true)}
                onClientUploadComplete={(res) => {
                  const array = res.map((file) => ({ name: file.name, key: file.key }))
                  setValue('files', array)
                  setUploadedFiles(array)
                  setFilesBeginUploading(false)
                }}
                onUploadError={(error: Error) => {
                  setFilesBeginUploading(false)
                  toast({ variant: 'destructive', title: 'Napaka pri nalaganju', description: error.message })
                }}
                className="ut-button:bg-primary-500 ut-button:ut-readying:bg-primary-500/50 mt-2"
              />
              {!isPending && uploadedFiles.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  {uploadedFiles.map((file) => (
                    <div className="relative flex items-center gap-3 rounded-md border border-gray-200 bg-primary-300/80 p-2 text-white shadow-sm" key={file.key}>
                      <div className="truncate">{file.name}</div>
                      <Button variant={'ghost'} className="max-w-fit" onClick={handleRemoveFile(file.key)} size="icon">
                        <CloseIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {isPending && <Spinner />}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button type="submit" disabled={imagesBeginUploading || filesBeginUploading} variant={'form'} className="w-full md:w-auto px-8 py-3 text-base rounded-lg shadow-md">
            Posodobi {type === LocationType.Apartments ? 'stanovanje' : 'hišo'}
          </Button>
          <Button type="button" disabled={imagesBeginUploading || filesBeginUploading} variant={'secondary'} onClick={onCancel} className="w-full md:w-auto px-8 py-3 text-base rounded-lg">
            Prekliči
          </Button>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </Form>
     {isPending && (
      <div className='mx-auto flex min-h-dvh'>
        <span className='loading loading-ball loading-xs'></span>
        <span className='loading loading-ball loading-sm'></span>
        <span className='loading loading-ball loading-md'></span>
        <span className='loading loading-ball loading-lg'></span>
      </div>
     )}
    </>
  )
}

export default EditApartmentForm
