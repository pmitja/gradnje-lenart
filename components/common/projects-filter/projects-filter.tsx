'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Location } from '@prisma/client'
import { Home, MapPin, Search } from 'lucide-react'
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

interface ProjectsFilterProps {
  onFilter?: () => void
}

const ProjectsFilter = ({ onFilter }: ProjectsFilterProps) => {
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
    if (onFilter) {
      setTimeout(() => {
        onFilter()
      }, 100) // slight delay to ensure state update
    }
  }

  return (
    <Form {...form}>
      <div className="relative w-full">
        {isPending && (
          <div className="flex h-24 w-full items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
            <Spinner />
          </div>
        )}
        {!isPending && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="grid gap-4 md:grid-cols-12">
              {location && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="md:col-span-5">
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-secondary-500">
                        <MapPin className="size-4 text-primary-500" />
                        Lokacija
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id="location"
                            className="mt-1 border-secondary-200 bg-white py-2 transition-all duration-200 hover:border-primary-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-300"
                          >
                            <SelectValue placeholder="Izberi lokacijo" />
                          </SelectTrigger>
                          <SelectContent className="border-secondary-200 shadow-lg">
                            <SelectItem value="all" className="mb-1 font-medium hover:bg-primary-50">Vse lokacije</SelectItem>
                            <div className="my-1 h-px w-full bg-secondary-100"></div>
                            {location.map((location) => (
                              <SelectItem
                                value={location.city}
                                key={location.id}
                                className="hover:bg-primary-50"
                              >
                                {location.city}
                              </SelectItem>
                            ))}
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
                name="type"
                render={({ field }) => (
                  <FormItem className="md:col-span-5">
                    <FormLabel className="text-secondary-600 flex items-center gap-2 text-sm font-medium">
                      <Home className="size-4 text-primary-500" />
                      Vrsta
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="type"
                          className="mt-1 border-secondary-200 bg-white py-2 transition-all duration-200 hover:border-primary-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-300"
                        >
                          <SelectValue placeholder="Izberi vrsto" />
                        </SelectTrigger>
                        <SelectContent className="border-secondary-200 shadow-lg">
                          <SelectItem value="all" className="mb-1 font-medium hover:bg-primary-50">Vse vrste</SelectItem>
                          <div className="my-1 h-px w-full bg-secondary-100"></div>
                          <SelectItem
                            value={LocationType.Apartments}
                            className="hover:bg-primary-50"
                          >
                            Večstanovanjski objekt
                          </SelectItem>
                          <SelectItem
                            value={LocationType.House}
                            className="hover:bg-primary-50"
                          >
                            Hiša
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="primary"
                className="mt-2 flex w-full items-center justify-center gap-2 px-6 py-2.5 shadow-md transition-all duration-200 hover:bg-primary-500 hover:shadow-lg md:col-span-2 md:mt-auto md:self-end"
              >
                <Search className="min-w-3" />
                <span>Išči</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </Form>
  )
}

export default ProjectsFilter
