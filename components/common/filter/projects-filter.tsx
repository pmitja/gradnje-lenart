'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Location } from '@prisma/client'
import { Search } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getAllLocations } from '@/actions/get-all-locations'
import Spinner from '@/components/common/spinner'
import { Button } from '@/components/ui/button'
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from '@/components/ui/form'
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from '@/components/ui/select'
import { useAppStore } from '@/store/app'
import { LocationType } from '@/types/general'
import { projectFilterSchema } from '@/validation-schemas/project-filters-schema'

const ProjectsFilter = () => {
  const { projectFilters, updateProjectFilters } = useAppStore()

  const form = useForm<z.infer<typeof projectFilterSchema>>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: {
      location: 'all',
      type: 'all',
    },
  })

  const [ isPending, startTransition ] = useTransition()

  const [ location, setLocation ] = useState<Location[] | null>(null)

  useEffect(() => {
    startTransition(async () => {
      const location = await getAllLocations()

      if (location) {
        setLocation(location)
      }
    })
  }, [])

  // Reset selection when projectFilters changes
  useEffect(() => {
    form.reset({
      location: projectFilters.location || 'all',
      type: projectFilters.type || 'all',
    })
  }, [ projectFilters, form ])

  function onSubmit(values: z.infer<typeof projectFilterSchema>) {
    updateProjectFilters(values)
  }

  return (
    <Form {...form}>
      <div className='relative flex-col items-start gap-8 md:flex'>
        {isPending && <Spinner />}
        {!isPending && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid w-full items-start gap-6'
          >
            <fieldset className='grid-col-1 grid max-w-fit items-center gap-4 rounded-lg border bg-body-200 p-4 shadow-sm lg:grid-cols-3 lg:gap-9 lg:rounded-full lg:px-10 lg:py-5'>
              {location && (
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-2 border-secondary-200 pr-2 md:pr-4 lg:border-r-2 lg:pr-6'>
                      <FormLabel className='text-text px-3 text-base font-bold lg:text-xl'>
                        Lokacija
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id='location'
                            className='!mt-0 flex min-w-[220px] place-items-center items-start gap-2 border-0 bg-transparent [&_[data-description]]:hidden'
                          >
                            <SelectValue placeholder='Izberi lokacijo' />
                          </SelectTrigger>
                          <SelectContent>
                            {location.map((location) => (
                              <SelectItem
                                value={location.city}
                                key={location.id}
                              >
                                {location.city}
                              </SelectItem>
                            ))}
                            <SelectItem value='all'>Vse lokacije</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2 border-secondary-200 pr-2 md:pr-4 lg:border-r-2 lg:pr-6'>
                    <FormLabel className='text-text px-3 text-base font-bold lg:text-xl'>
                      Vrsta
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id='type'
                          className='!mt-0 flex min-w-[220px] items-start gap-2 border-0 bg-transparent [&_[data-description]]:hidden'
                        >
                          <SelectValue placeholder='Izberi vrsto' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value={LocationType.Apartments}
                            className='hover:bg-primary-50'
                          >
                            Več stanovanjski objekt
                          </SelectItem>
                          <SelectItem value={LocationType.House}>Hiša</SelectItem>
                          <SelectItem value='all'>Vse vrste</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                variant='primary'
                className='flex w-full gap-2 px-6 py-2 lg:w-auto lg:px-8 lg:py-3'
              >
                <Search />
                Filter
              </Button>
            </fieldset>
          </form>
        )}
      </div>
    </Form>
  )
}

export default ProjectsFilter
