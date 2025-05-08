'use client'

import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useTransition } from 'react'

import { getAllLocations } from '@/actions/get-all-locations'
import Spinner from '@/components/common/spinner'

interface Location {
  id: number
  name: string
  description: string
  address: string
  city: string
  slug: string
  images: string[]
  type: string
  isActive: boolean
  count?: {
    realEstates: number
  }
}

// Location Card component
const LocationCard = ({
  name,
  description,
  city,
  image,
  count,
  slug,
}: {
  name: string
  description: string
  city: string
  image: string
  count: number
  slug: string
}) => {
  // Create readable text for property count
  let propertyCountText = 'Nepremičnin'

  if (count === 1) {
    propertyCountText = 'Nepremičnina'
  } else if (count > 1 && count < 5) {
    propertyCountText = 'Nepremičnine'
  }

  return (
    <Link href={`/projekt/${slug}`} className="group relative overflow-hidden rounded-lg">
      <div className="relative h-52 w-full transition-transform duration-300 group-hover:scale-105">
        <Image
          src={image || '/apartment-image.webp'}
          alt={name}
          fill
          className="rounded-lg object-cover brightness-75 transition-all duration-300 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="mb-1 flex items-center gap-1 text-sm">
            <MapPin className="size-3" />
            <span>{city}</span>
          </div>
          <p className="line-clamp-2 text-sm">{description}</p>
          <p className="mt-1 text-sm font-medium">
            {count} {propertyCountText}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function LocationsSection() {
  const [isPending, startTransition] = useTransition()

  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    startTransition(async () => {
      const location = await getAllLocations()

      if (location) {
        setLocations(location)
      }
    })
  }, [])

  // Render different states based on loading and data
  let content

  if (isPending) {
    content = (
      <div className="flex h-64 w-full items-center justify-center">
        <Spinner />
      </div>
    )
  } else if (locations.length === 0) {
    content = (
      <div className="rounded-lg border border-secondary-200 bg-white p-8 text-center shadow-sm">
        <h3 className="text-secondary-800 text-xl font-medium">
          Trenutno ni na voljo nobenih lokacij
        </h3>
        <p className="text-secondary-600 mt-2">Preverite ponovno kasneje za nove projekte.</p>
      </div>
    )
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            name={location.name}
            description={location.description}
            city={location.city}
            image={
              location.images && location.images[0]
                ? `https://utfs.io/f/${location.images[0]}`
                : '/apartment-image.webp'
            }
            count={location.count?.realEstates || 0}
            slug={location.slug}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-8 md:py-16">
      <div className="mb-8">
        <h2 className="text-secondary-800 text-3xl font-bold sm:text-4xl">Aktivne lokacije</h2>
        <p className="text-secondary-600 mt-2">
          Odkrijte naše aktualne projekte na različnih lokacijah
        </p>
      </div>
      {content}
    </section>
  )
}
