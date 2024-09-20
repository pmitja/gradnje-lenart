'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { Tag, TagInput } from 'emblor'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { UploadedFileData, UploadFileResult } from 'uploadthing/types'
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
import { UploadButton } from '@/lib/utils/uploadthing'
import { formSchema } from '@/schemas'
import { Apartment, EnergyClass, ExposedType, SpacesType, StatusType } from '@/types/general'

const ApartmentForm = ({ saveFormValues }: { saveFormValues: (values: Apartment) => void }) => {
  const [ open, setOpen ] = useState(false)

  const [ imagesBeginUploading, setImagesBeginUploading ] = useState(false)

  const [ filesBeginUploading, setFilesBeginUploading ] = useState(false)

  const [ uploadedImages, setUploadedImages ] = useState<string[]>([])

  const [ uploadedFiles, setUploadedFiles ] = useState<{ name: string; key: string }[]>([])

  const [ technicalData, setTechnicalData ] = useState<Tag[]>([])

  const [ activeTagIndex, setActiveTagIndex ] = useState<number | null>(null)

  const [ isPending, startTransition ] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
      name: '',
      floor: '',
      size: 0,
      price: 0,
      priceWithTax: 0,
      status: StatusType.Prodaja,
      images: [],
      shortDescription: '',
      description: '',
      spaces: [],
      energyLevel: '',
      parkingSpaces: 0,
      technicalData: [],
      files: [],
      isExposed: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveFormValues(values)
    setOpen(false)
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
        <Button variant='outline'>Dodaj stanovanje</Button>
      </DialogTrigger>
      <DialogContent className='max-h-screen w-full max-w-3xl overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Dodaj stanovanje</DialogTitle>
          <DialogDescription>Prosim vnesite točne podatke o stanovanju.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <div className='grid grid-cols-1 items-center gap-4'>
              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Št. apartments</FormLabel>
                    <FormControl>
                      <Input
                        id='number'
                        defaultValue='1'
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
                    <FormLabel>Naziv</FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        defaultValue='2 sobno stanovanje'
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
                name='shortDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kratki opis</FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        defaultValue='Opis stanovanja'
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis</FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        defaultValue='Opis stanovanja'
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
                name='floor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etaža</FormLabel>
                    <FormControl>
                      <Input
                        id='floor'
                        defaultValue='3. nadstropje'
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
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kvadratura</FormLabel>
                    <FormControl>
                      <Input
                        id='size'
                        defaultValue='3'
                        className='col-span-3'
                        type='number'
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
                    <FormLabel>Cena (brez ddv)</FormLabel>
                    <FormControl>
                      <Input
                        id='price'
                        defaultValue='100000'
                        className='col-span-3'
                        type='number'
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
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input
                        id='priceWithTax'
                        defaultValue='130000'
                        className='col-span-3'
                        type='number'
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
                    <FormLabel>Status</FormLabel>
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
                    <FormLabel>Status</FormLabel>
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
                onClientUploadComplete={(res: UploadFileResult) => {
                  const array = res.map((file: UploadedFileData) => file.key)

                  setValue('images', array)
                  setUploadedImages(array)
                  setImagesBeginUploading(false)
                }}
                onUploadError={(error: Error) => {
                  setImagesBeginUploading(false)
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`)
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
                onClientUploadComplete={(res: UploadFileResult) => {
                  const array = res.map((file: UploadedFileData) => ({
                    name: file.name, key: file.key,
                  }))

                  setValue('files', array)
                  setUploadedFiles(array)
                  setFilesBeginUploading(false)
                }}
                onUploadError={(error: Error) => {
                  setFilesBeginUploading(false)
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`)
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
                type='submit'
                disabled={imagesBeginUploading || filesBeginUploading}
                variant={'form'}
              >
                Dodaj stanovanje
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApartmentForm
