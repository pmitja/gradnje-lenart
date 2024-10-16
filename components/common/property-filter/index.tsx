'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'

import ButtonWithIcon from '../button-with-icon'

interface PropertyFilterProps {
  isDesktop?: boolean
  type: string
}

const PropertyFilter = ({ isDesktop = true, type }: PropertyFilterProps) => {
  const MAX_PRICE = 500000

  const MIN_PRICE = 0

  const STEP = 500

  const { propertyFilters, updatePropertyFilters, resetFilters } = useAppStore()

  const form = useForm({
    defaultValues: {
      floor: propertyFilters.floor,
      size: propertyFilters.size,
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
    <Card className="mx-auto w-full border-none bg-transparent px-0 shadow-none">
      {isDesktop && (
        <CardHeader className='px-0'>
          <CardTitle className="text-xl font-bold text-secondary-400 lg:text-3xl">Filtri</CardTitle>
        </CardHeader>
      )}
      <CardContent className='px-0'>
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {type === 'Večstanovanjski objekt' && <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="flex h-auto flex-col gap-4 rounded-2xl bg-primary-50 p-4 shadow-md">
                  <FormLabel className="text-lg font-semibold">Nadstropje:</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {[ 'P', '1', '2', '3', '4', 'Vsa' ].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          onClick={() => field.onChange(value)}
                          className={cn(
                            'rounded-xl border-none bg-secondary-50 px-4 py-2 text-sm font-medium hover:bg-primary-300 hover:text-body-300',
                            field.value === value && 'bg-primary-200 text-body-300',
                          )}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />}

            {type === 'Večstanovanjski objekt' && <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem className="flex h-auto flex-col gap-4 rounded-2xl bg-primary-50 p-4 shadow-md">
                  <FormLabel className="text-lg font-semibold">Velikost:</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {[ 'Enosobno', 'Ena in pol sobno', 'Dvosobno', 'Trisobno' ].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          onClick={() => field.onChange(value)}
                          className={cn(
                            'rounded-xl border-none bg-secondary-50 px-4 py-2 text-sm font-medium hover:bg-primary-300 hover:text-body-300',
                            field.value === value && 'bg-primary-200 text-body-300',
                          )}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex h-auto flex-col gap-4 rounded-2xl bg-primary-50 p-4 shadow-md">
                  <FormLabel className="text-lg font-semibold">Status:</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {[ 'Na prodaj', 'Rezervirano', 'Prodano' ].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          onClick={() => field.onChange(value)}
                          className={cn(
                            'rounded-xl border-none bg-secondary-50 px-6 py-2 text-sm font-medium hover:bg-primary-300 hover:text-body-300',
                            field.value === value && 'bg-primary-200 text-body-300',
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
                <FormItem className="flex h-auto flex-col gap-4 rounded-2xl bg-primary-50 p-4 shadow-md">
                  <FormLabel className="text-lg font-semibold">Cena:</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <Slider
                        defaultValue={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        max={MAX_PRICE}
                        min={MIN_PRICE}
                        step={STEP}
                        className="py-4"
                      />
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="inline-flex items-center rounded-xl bg-secondary-50 p-2">
                            <span className="text-xs font-medium">od</span>
                            <Input
                              type="number"
                              className="inline h-auto max-w-16 border-none bg-transparent p-0 text-center text-sm font-medium"
                              onChange={(e) => field.onChange([
                                parseInt(e.target.value, 10), field.value[1] ])}
                              value={field.value[0]}
                            />
                            <span className="text-xs font-medium">€</span>
                          </div>
                          <p className="text-xs text-gray-500">min.</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="inline-flex items-center rounded-xl bg-secondary-50 p-2">
                            <span className="text-xs font-medium">do</span>
                            <Input
                              type="number"
                              className="inline h-auto max-w-16 border-none bg-transparent p-0 text-center text-sm font-medium"
                              onChange={(e) => field.onChange([ field.value[0],
                                parseInt(e.target.value, 10) ])}
                              value={field.value[1]}
                            />
                            <span className="text-xs font-medium">€</span>
                          </div>
                          <p className="text-xs text-gray-500">max.</p>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <ButtonWithIcon
              type="button"
              variant="secondary"
              className="max-w-fit rounded-xl px-10 py-3 text-lg font-semibold drop-shadow-primary-button md:col-span-2"
              onClick={onReset}
            >
              Poenostavi filtre
            </ButtonWithIcon>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PropertyFilter
