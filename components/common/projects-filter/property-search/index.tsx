'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PropertySearch() {
  const [ location, setLocation ] = useState('')

  const [ propertyType, setPropertyType ] = useState('')

  const [ priceRange, setPriceRange ] = useState('')

  const handleSearch = () => {
    // In a real app, this would redirect to search results with filter parameters
    window.location.href = `/nepremicnine?location=${location}&type=${propertyType}&price=${priceRange}`
  }

  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-5xl rounded-lg bg-white py-8 shadow-md">
      <div className="container px-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary-300">
          Poiščite svojo popolno nepremičnino
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-secondary-200">
              Lokacija
            </label>
            <Input
              id="location"
              placeholder="Vnesite lokacijo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="property-type" className="text-sm font-medium text-secondary-200">
              Tip nepremičnine
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="property-type">
                <SelectValue placeholder="Izberite tip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Stanovanje</SelectItem>
                <SelectItem value="house">Hiša</SelectItem>
                <SelectItem value="commercial">Poslovni prostor</SelectItem>
                <SelectItem value="land">Zemljišče</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="price-range" className="text-sm font-medium text-secondary-200">
              Cenovni razpon
            </label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger id="price-range">
                <SelectValue placeholder="Izberite razpon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100000">Do 100.000 €</SelectItem>
                <SelectItem value="100000-200000">100.000 € - 200.000 €</SelectItem>
                <SelectItem value="200000-300000">200.000 € - 300.000 €</SelectItem>
                <SelectItem value="300000-500000">300.000 € - 500.000 €</SelectItem>
                <SelectItem value="500000+">Nad 500.000 €</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full bg-primary-300 text-white hover:bg-primary-400"
            >
              <Search className="mr-2 size-4" />
              Iskanje
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/nepremicnine" className="text-sm text-primary-300 hover:underline">
            Ogled vseh nepremičnin
          </Link>
        </div>
      </div>
    </section>
  )
}
