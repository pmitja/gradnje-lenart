'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

// Sample property data - in a real app, this would come from an API or database
const properties = [
  {
    id: 'prop1',
    title: 'Vila na Gorenjskem',
    location: 'Bled, Gorenjska',
    price: '€850.000',
    bedrooms: 5,
    bathrooms: 2,
    image: '/apartment-image.webp',
    featured: true,
  },
  {
    id: 'prop2',
    title: 'Luksuzno stanovanje',
    location: 'Ljubljana, Center',
    price: '€450.000',
    bedrooms: 3,
    bathrooms: 2,
    image: '/apartment-image.webp',
    featured: true,
  },
  {
    id: 'prop3',
    title: 'Moderna hiša z vrtom',
    location: 'Maribor, Tabor',
    price: '€320.000',
    bedrooms: 4,
    bathrooms: 2,
    image: '/apartment-image.webp',
    featured: true,
  },
  {
    id: 'prop4',
    title: 'Apartma z razgledom',
    location: 'Koper, Obala',
    price: '€280.000',
    bedrooms: 2,
    bathrooms: 1,
    image: '/apartment-image.webp',
    featured: true,
  },
]

const PropertyCard = ({ property }: { property: typeof properties[0] }) => (
  <div className="group flex flex-col overflow-hidden rounded-lg transition-all">
    <div className="relative h-[280px] w-full overflow-hidden rounded-lg">
      <Image
        src={property.image}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* For Sale Badge */}
      <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-1 text-sm font-medium">
        Naprodaj
      </div>
    </div>

    <div className="mt-4 space-y-1">
      {/* Property Details */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{property.bedrooms} Sob</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm font-medium">{property.bathrooms} Kopalnic</span>
        </div>
      </div>

      {/* Property Title */}
      <h3 className="text-xl font-bold text-secondary-300">{property.title}</h3>

      {/* Price */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-secondary-300">{property.price}</span>
        <span className="text-sm text-secondary-200">{property.location}</span>
      </div>
    </div>
  </div>
)

export default function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-secondary-300">Raziskujte naše vrhunske nepremičnine</h2>
            <p className="mt-4 text-lg text-secondary-200">
              Vsaka nepremičnina ponuja edinstvene značilnosti, izjemno kakovost in
              odlične lokacije, ki zagotavljajo ekskluzivno bivalno izkušnjo.
            </p>
          </div>

          <Button
            variant="primary"
            className="self-end rounded-full border-black bg-black px-6 py-2 text-white hover:bg-black/90 sm:self-auto"
            asChild
          >
            <Link href="/projekti">
              Vsi projekti <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
