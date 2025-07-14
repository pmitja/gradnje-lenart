'use client'

import { FilterIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

interface PropertyFilterProps {
  isDesktop?: boolean
  type: string
}

const PropertyFilter = ({ isDesktop = true, type }: PropertyFilterProps) => {
  const MAX_PRICE = 500000

  const MIN_PRICE = 0

  const STEP = 500

  const { propertyFilters, updatePropertyFilters, resetFilters } = useAppStore()

  const form = useForm<{ floor?: string; sobnost?: number; priceRange?: [number, number]; availability?: string }>({
    defaultValues: {
      floor: propertyFilters.floor,
      sobnost: propertyFilters.sobnost,
      priceRange: propertyFilters.priceRange || [ MIN_PRICE, MAX_PRICE ],
      availability: propertyFilters.availability,
    },
  })

  const onReset = () => {
    form.reset()
    resetFilters()
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      updatePropertyFilters({
        ...value,
        priceRange: value.priceRange
          ? [ value.priceRange[0] || MIN_PRICE, value.priceRange[1] || MAX_PRICE ]
          : [ MIN_PRICE, MAX_PRICE ],
      })
    })

    return () => subscription.unsubscribe()
  }, [ form, updatePropertyFilters ])

  useEffect(() => {
    if (propertyFilters.isReseted) {
      form.reset()
      updatePropertyFilters({
        isReseted: false,
      })
    }
  }, [ propertyFilters ])

  return (
    <Card className="mx-auto w-full border-0 bg-transparent px-0 shadow-none">
      {isDesktop && (
        <CardHeader className="px-0">
          <CardTitle className="text-secondary-700 flex items-center gap-2 text-xl font-bold lg:text-2xl">
            <div className="rounded-full bg-primary-100 p-2">
              <FilterIcon className="text-primary-600 size-5" />
            </div>
            Filtri iskanja
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-0">
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {type === 'Večstanovanjski objekt' && (
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem className="flex h-auto flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <FormLabel className="text-secondary-700 text-base font-semibold">Nadstropje</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {[ 'P', '1', '2', '3', '4', 'Vsa' ].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            onClick={() => field.onChange(value)}
                            className={cn(
                              'rounded-md border-gray-200 px-3 py-1.5 text-sm font-medium hover:bg-primary-50 hover:text-primary-600',
                              field.value === value && 'border-primary-200 bg-primary-50 text-primary-700',
                            )}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {type === 'Večstanovanjski objekt' && (
              <FormField
                control={form.control}
                name="sobnost"
                render={({ field }) => (
                  <FormItem className="flex h-auto flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <FormLabel className="text-secondary-700 text-base font-semibold">Sobnost</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {[1, 1.5, 2, 2.5, 3].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            onClick={() => field.onChange(value)}
                            className={cn(
                              'rounded-md border-gray-200 px-3 py-1.5 text-sm font-medium hover:bg-primary-50 hover:text-primary-600',
                              field.value === value && 'border-primary-200 bg-primary-50 text-primary-700',
                            )}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex h-auto flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                  <FormLabel className="text-secondary-700 text-base font-semibold">Status</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {[ 'Na prodaj', 'Rezervirano', 'Prodano' ].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          onClick={() => field.onChange(value)}
                          className={cn(
                            'rounded-md border-gray-200 px-3 py-1.5 text-sm font-medium hover:bg-primary-50 hover:text-primary-600',
                            field.value === value && 'border-primary-200 bg-primary-50 text-primary-700',
                            value === 'Na prodaj' && field.value === value
                              && 'border-green-200 bg-green-50 text-green-700',
                            value === 'Rezervirano' && field.value === value
                              && 'border-orange-200 bg-orange-50 text-orange-700',
                            value === 'Prodano' && field.value === value
                              && 'border-red-200 bg-red-50 text-red-700',
                          )}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem className="flex h-auto flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                  <FormLabel className="text-secondary-700 text-base font-semibold">Cena</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-6">
                      <Slider
                        defaultValue={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        max={MAX_PRICE}
                        min={MIN_PRICE}
                        step={STEP}
                        className="py-3"
                      />
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1">
                            <span className="text-xs font-medium text-gray-500">Od</span>
                            <Input
                              type="number"
                              className="inline h-auto max-w-16 border-none bg-transparent p-0 px-1 text-center text-sm font-medium"
                              onChange={(e) => field.onChange([ parseInt(e.target.value, 10), field.value?.[1] ?? MAX_PRICE ])}
                              value={field.value?.[0] ?? MIN_PRICE}
                            />
                            <span className="text-xs font-medium text-gray-500">€</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1">
                            <span className="text-xs font-medium text-gray-500">Do</span>
                            <Input
                              type="number"
                              className="inline h-auto max-w-16 border-none bg-transparent p-0 px-1 text-center text-sm font-medium"
                              onChange={(e) => field.onChange([ field.value?.[0] ?? MIN_PRICE, parseInt(e.target.value, 10) ])}
                              value={field.value?.[1] ?? MAX_PRICE}
                            />
                            <span className="text-xs font-medium text-gray-500">€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              className="text-secondary-700 mt-2 flex w-fit items-center gap-2 rounded-md border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 md:col-span-2"
              onClick={onReset}
            >
              Ponastavi filtre
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PropertyFilter
