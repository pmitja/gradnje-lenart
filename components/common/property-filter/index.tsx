'use client'

import { useState } from 'react'

import ArrowSearchIcon from '@/components/icons/arrow-search'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

import ButtonWithIcon from '../button-with-icon'

interface PropertyFilterProps {
  isDesktop?: boolean
}

const PropertyFilter = ({ isDesktop = true }: PropertyFilterProps) => {
  const MAX_PRICE = 500000

  const MIN_PRICE = 0

  const STEP = 500

  const [ apartmentPrice, setApartmentPrice ] = useState([ 0, 300000 ])

  const [ floor, setFloor ] = useState('3')

  const [ size, setSize ] = useState('Dvosobno')

  const [ additional, setAdditional ] = useState([ 'Parkirišče' ])

  const [ availability, setAvailability ] = useState('Vsa')

  const updateApartmentPrice = (value: number | number[], type?: 'min' | 'max') => {
    const clamp = (v: number) => Math.min(Math.max(v, MIN_PRICE), MAX_PRICE)

    if (Array.isArray(value)) {
      const [ newMin, newMax ] = value.map((v) => clamp(Number.isNaN(v) ? MIN_PRICE : v))

      setApartmentPrice([ newMin, Math.max(newMin, newMax) ])
    } else {
      const newValue = clamp(Number.isNaN(value) ? MIN_PRICE : value)

      setApartmentPrice((prev) => {
        if (type === 'min') {
          return [ newValue, Math.max(newValue, prev[1]) ]
        } if (type === 'max') {
          return [ prev[0], Math.max(prev[0], newValue) ]
        }
        return prev
      })
    }
  }

  const toggleAdditional = (value: string) => {
    // eslint-disable-next-line max-len
    setAdditional((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [ ...prev, value ]))
  }

  return (
    <Card className="mx-auto w-full border-none bg-transparent px-0 shadow-none">
      {isDesktop && (
        <CardHeader className='px-0'>
          <CardTitle className="text-3xl font-bold">Filtri</CardTitle>
        </CardHeader>
      )}
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-2xl bg-primary-50 p-4 shadow-md">
          <Label>Nadstropje:</Label>
          <div className="flex flex-wrap gap-2">
            {[ 'P', '1', '2', '3', '4', 'Vsa' ].map((value) => (
              <Button
                key={value}
                variant="outline"
                onClick={() => setFloor(value)}
                className={cn(
                  'rounded-2xl border-none bg-secondary-50 p-4 hover:bg-primary-300 hover:text-body-300',
                  floor === value && 'bg-primary-200 text-body-300',
                )}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-primary-50 p-4 shadow-md">
          <Label>Velikost:</Label>
          <div className="flex flex-wrap gap-2">
            {[ 'Enosobno', 'Ena in pol sobno', 'Dvosobno', 'Trisobno' ].map((value) => (
              <Button
                key={value}
                variant="outline"
                onClick={() => setSize(value)}
                className={cn(
                  'rounded-2xl border-none bg-secondary-50 p-4 hover:bg-primary-300 hover:text-body-300',
                  size === value && 'bg-primary-200 text-body-300',
                )}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-primary-50 p-4 shadow-md">
          <Label>Cena:</Label>
          <Slider
            defaultValue={apartmentPrice}
            onValueChange={(value) => updateApartmentPrice(value)}
            value={apartmentPrice}
            max={MAX_PRICE}
            min={MIN_PRICE}
            step={STEP}
          />
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center rounded-2xl bg-secondary-50 p-4">
                <span className="text-sm">od</span>
                <Input
                  id="min-price"
                  type="number"
                  className="inline h-auto max-w-16 border-none bg-transparent p-0 text-center text-sm"
                  onChange={(e) => updateApartmentPrice(parseInt(e.target.value, 10), 'min')}
                  value={apartmentPrice[0]}
                />
                <span className="text-sm">€</span>
              </div>
              <p className="text-xs">min.</p>
            </div>
            <div className="p-2 text-2xl">-</div>
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center rounded-2xl bg-secondary-50 p-4">
                <span className="text-sm">do</span>
                <Input
                  id="max-price"
                  type="number"
                  className="inline h-auto max-w-16 border-none bg-transparent p-0 text-center text-sm"
                  onChange={(e) => updateApartmentPrice(parseInt(e.target.value, 10), 'max')}
                  value={apartmentPrice[1]}
                />
                <span className="text-sm">€</span>
              </div>
              <p className="text-xs">max.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-primary-50 p-4 shadow-md">
          <Label>Dodatno:</Label>
          <div className="flex flex-wrap gap-2">
            {[ 'Atri', 'Balkon', 'Parkirišče', 'Garažno mesto', 'Shramba v kletnih prostorih' ].map(
              (value) => (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => toggleAdditional(value)}
                  className={cn(
                    'rounded-2xl border-none bg-secondary-50 p-4 hover:bg-primary-300 hover:text-body-300',
                    additional.includes(value) && 'bg-primary-200 text-body-300',
                  )}
                >
                  {value}
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-primary-50 p-4 shadow-md">
          <Label>Prosta:</Label>
          <div className="flex gap-2">
            {[ 'Vsa', 'Da', 'Ne' ].map((value) => (
              <Button
                key={value}
                variant="outline"
                onClick={() => setAvailability(value)}
                className={cn(
                  'rounded-2xl border-none bg-secondary-50 p-4 hover:bg-primary-300 hover:text-body-300',
                  availability === value && 'bg-primary-200 text-body-300',
                )}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <ButtonWithIcon
          variant="primary"
          className="max-w-fit rounded-2xl px-10 py-3 text-xl font-normal text-body-300 drop-shadow-primary-button md:col-span-2"
          icon={<ArrowSearchIcon />}
          iconPosition="left"
        >
          Išči
        </ButtonWithIcon>
      </CardContent>
    </Card>
  )
}

export default PropertyFilter
