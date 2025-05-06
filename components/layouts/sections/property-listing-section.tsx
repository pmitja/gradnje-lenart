'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { getAllRealEstates } from '@/actions/get-all-real-estates'
import Spinner from '@/components/common/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'

// Types based on Prisma schema
interface Location {
id: number
name: string
city: string
slug: string
type: string
// other fields from the schema
}

interface RealEstate {
id: string
name: string
description?: string | null
size?: number | null
price?: number | null
priceWithTax?: number | null
images: string[]
status?: string | null
slug: string
floor?: string | null
locationId: number
parkingSpaces?: number | null
shortDescription?: string | null
location: Location
}

// Helper functions
const formatPrice = (price?: number | null) => {
  if (price === null || price === undefined) return 'Cena na povpraševanje'
  return `€${price.toLocaleString()}`
}

// Property Card Component
const PropertyCard = ({ property }: { property: RealEstate }) => {
// Determine status badge style
  let statusBadgeClass = 'absolute top-4 left-4 px-4 py-1 text-sm font-medium rounded-full'

  let statusText = property.status || 'Na prodaj'

  if (property.status === 'Na prodaj' || !property.status) {
    statusBadgeClass += ' bg-green-700 text-white'
    statusText = 'NA PRODAJ'
  } else if (property.status === 'Rezervirano') {
    statusBadgeClass += ' bg-orange-500 text-white'
    statusText = 'REZERVIRANO'
  } else if (property.status === 'Za najem') {
    statusBadgeClass += ' bg-blue-600 text-white'
    statusText = 'ZA NAJEM'
  } else {
    statusBadgeClass += ' bg-gray-700 text-white'
  }

  return (
  <div className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
    <div className="relative h-[260px] w-full overflow-hidden">
      <Image
        src={property.images[0] || '/apartment-image.webp'}
        alt={property.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Status Badge */}
      <div className={statusBadgeClass}>
        {statusText}
      </div>
    </div>

    <div className="space-y-3 p-4">
      {/* Property Title */}
      <h3 className="text-secondary-900 text-xl font-bold">{property.name}</h3>

      {/* Location */}
      <div className="flex items-center text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm">
          {property.location.name}, {property.location.city}
        </span>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-2">
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-sm font-medium">{property.size} m²</span>
        </div>

        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium">{property.floor || 'P'}</span>
        </div>

        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium">{property.parkingSpaces || 0}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-primary-600 text-xl font-bold">
          {property.status === 'Za najem'
            ? `${formatPrice(property.price)}/mesec`
            : formatPrice(property.price)}
        </span>
        <Button
          variant="outline"
          className="border-primary-600 text-primary-600 rounded-full hover:bg-primary-50"
          asChild
        >
          <Link href={`/projekt/${property.location.slug}/${property.id}`}>
            Podrobnosti
          </Link>
        </Button>
      </div>
    </div>
  </div>
  )
}

// Empty Results Component
const EmptyResults = ({ onReset }: { onReset: () => void }) => (
<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-8 text-center">
  <h3 className="text-secondary-700 text-xl font-semibold">
    Ni najdenih nepremičnin
  </h3>
  <p className="mt-2 text-secondary-500">
    Poskusite z drugačnimi filtri ali si oglejte našo celotno ponudbo.
  </p>
  <Button
    className="mt-4"
    variant="outline"
    onClick={onReset}
  >
    Ponastavi filtre
  </Button>
</div>
)

// Property types for filtering based on the LocationType enum
const PROPERTY_TYPES = [
  {
    id: 'all', label: 'Vse nepremičnine',
  },
  {
    id: 'Večstanovanjski objekt', label: 'Večstanovanjski objekti',
  },
  {
    id: 'Hiša', label: 'Hiše',
  },
]

export default function PropertyListingSection() {
  const [ properties, setProperties ] = useState<RealEstate[]>([])

  const [ displayedProperties, setDisplayedProperties ] = useState<RealEstate[]>([])

  const [ loading, setLoading ] = useState(true)

  const [ isPending, startTransition ] = useTransition()

  const [ hasMore, setHasMore ] = useState(true)

  const [ page, setPage ] = useState(1)

  const [ activeFilter, setActiveFilter ] = useState('all')

  const PROPERTIES_PER_PAGE = 6

  const observer = useRef<IntersectionObserver | null>(null)

  const { propertyFilters, projectFilters } = useAppStore()

  // Filter properties based on user selection
  const filterProperties = useCallback((propertiesList: RealEstate[]) => propertiesList.filter(
    (property) => {
      // Filter by project location (city)
      if (projectFilters.location && projectFilters.location !== 'all') {
        if (property.location.city !== projectFilters.location) {
          return false
        }
      }

      // Filter by project type
      if (projectFilters.type && projectFilters.type !== 'all') {
        if (property.location.type !== projectFilters.type) {
          return false
        }
      }

      // Filter by location type
      if (activeFilter !== 'all') {
        if (!property.location?.type || property.location.type !== activeFilter) {
          return false
        }
      }

      // Filter by floor
      if (
        propertyFilters.floor
          && propertyFilters.floor !== 'Vsa'
          && property.floor !== propertyFilters.floor
      ) {
        return false
      }

      // Filter by size/type
      if (propertyFilters.size) {
        // This is simplified - in a real app, you'd have a more sophisticated mapping
        const sizeMappings: Record<string, number[]> = {
          Enosobno: [ 0, 45 ],
          'Ena in pol sobno': [ 45, 55 ],
          Dvosobno: [ 55, 75 ],
          Trisobno: [ 75, 1000 ],
        }

        const range = sizeMappings[propertyFilters.size]

        if (range && property.size && (property.size < range[0] || property.size > range[1])) {
          return false
        }
      }

      // Filter by price range
      if (
        propertyFilters.priceRange
          && property.price
          && (
            property.price < propertyFilters.priceRange[0]
            || property.price > propertyFilters.priceRange[1]
          )
      ) {
        return false
      }

      // Filter by availability/status
      if (propertyFilters.availability && property.status !== propertyFilters.availability) {
        return false
      }

      return true
    },
  ), [ projectFilters, propertyFilters, activeFilter ])

  const loadMoreProperties = useCallback(() => {
    if (!hasMore) return

    startTransition(() => {
      const filteredResults = filterProperties(properties)

      const nextPage = page + 1

      const startIndex = (nextPage - 1) * PROPERTIES_PER_PAGE

      const endIndex = nextPage * PROPERTIES_PER_PAGE

      setDisplayedProperties((prev) => [ ...prev, ...filteredResults.slice(startIndex, endIndex) ])
      setPage(nextPage)
      setHasMore(filteredResults.length > endIndex)
    })
  }, [ hasMore, properties, page, PROPERTIES_PER_PAGE, filterProperties ])

  // Initial data load
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const data = await getAllRealEstates()

        setProperties(data)

        startTransition(() => {
          const filteredResults = filterProperties(data)

          setDisplayedProperties(filteredResults.slice(0, PROPERTIES_PER_PAGE))
          setHasMore(filteredResults.length > PROPERTIES_PER_PAGE)
        })
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [ filterProperties ])

  // Update filters when projectFilters changes
  useEffect(() => {
    if (properties.length > 0) {
      startTransition(() => {
        const filteredResults = filterProperties(properties)

        setDisplayedProperties(filteredResults.slice(0, PROPERTIES_PER_PAGE))
        setPage(1)
        setHasMore(filteredResults.length > PROPERTIES_PER_PAGE)
      })
    }
  }, [ projectFilters, properties, filterProperties ])

  // Handle filter changes with startTransition
  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId)

    startTransition(() => {
      const filteredResults = filterProperties(properties)

      setDisplayedProperties(filteredResults.slice(0, PROPERTIES_PER_PAGE))
      setPage(1)
      setHasMore(filteredResults.length > PROPERTIES_PER_PAGE)
    })
  }, [ properties, propertyFilters, projectFilters ])

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    useAppStore.getState().resetFilters()
    setActiveFilter('all')

    startTransition(() => {
      const filteredResults = filterProperties(properties)

      setDisplayedProperties(filteredResults.slice(0, PROPERTIES_PER_PAGE))
      setPage(1)
      setHasMore(filteredResults.length > PROPERTIES_PER_PAGE)
    })
  }, [ properties, projectFilters ])

  // Infinite scroll
  const lastPropertyRef = useCallback((node: HTMLDivElement) => {
    if (loading || isPending) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProperties()
      }
    })

    if (node) observer.current.observe(node)
  }, [ loading, isPending, hasMore, loadMoreProperties ])

  // Render filter tabs using badges
  const renderFilterTabs = () => (
    <div className="flex flex-wrap gap-2">
      {PROPERTY_TYPES.map((filter) => (
        <Badge
          key={filter.id}
          className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium ${
            activeFilter === filter.id
              ? 'text-secondary-900 border border-gray-200 bg-secondary-50 shadow-sm'
              : 'hover:text-secondary-700 border border-gray-200 bg-white text-secondary-500'
          }`}
          onClick={() => handleFilterChange(filter.id)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  )

  // Render different content based on loading state and filtered results
  const renderContent = () => {
    if (loading && displayedProperties.length === 0) {
      return <div className="flex h-64 w-full items-center justify-center">
      <Spinner />
    </div>
    }

    const filteredResults = filterProperties(properties)

    if (filteredResults.length === 0) {
      return <EmptyResults onReset={handleResetFilters} />
    }

    return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedProperties.map((property, index) => {
          if (index === displayedProperties.length - 1) {
            return (
              <div ref={lastPropertyRef} key={property.id}>
                <PropertyCard property={property} />
              </div>
            )
          }
          return <PropertyCard key={property.id} property={property} />
        })}
      </div>
      {(loading || isPending) && displayedProperties.length > 0 && (
        <div className="mt-8 text-center">
          <Spinner />
        </div>
      )}
    </>
    )
  }

  return (
  <section className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Vse nepremičnine</h2>
        </div>
        <div className="mt-4 md:mt-0">
          {renderFilterTabs()}
        </div>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  </section>
  )
}
