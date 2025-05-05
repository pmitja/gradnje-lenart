'use client'

import { ArrowRight, ArrowUpRight, Bath, Bed, Heart, Home, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, useTransition } from 'react'

import { getAllRealEstates } from '@/actions/get-all-real-estates'
import { getLocationsByCity } from '@/actions/get-locations-by-city'
import NoResultsBanner from '@/components/common/no-results-banner'
import Spinner from '@/components/common/spinner'
import CloseIcon from '@/components/icons/close'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'
import { LocationType } from '@/types/general'

// Featured Property Card
const FeaturedPropertyCard = ({
  title,
  address,
  city,
  price,
  size,
  image,
  slug,
  spaces,
}: {
  title: string
  address: string
  city: string
  price: number | null
  size: number | null
  image: string | null
  slug: string
  spaces: string[]
}) => {
  const hasBedrooms = spaces.includes('Spalnica')

  const hasBathrooms = spaces.includes('Kopalnica')

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Image
          className="h-60 w-full object-cover"
          width={500}
          height={300}
          src={image ? `https://utfs.io/f/${image}` : '/apartment-image.webp'}
          alt={title}
        />

        <div className="absolute right-3 top-3">
          <button className="flex size-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-500">
            <Heart className="size-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/stanovanja/${slug}`} className="group-hover:text-primary-500">
          <h3 className="text-secondary-800 mb-2 text-lg font-bold transition-colors duration-300">
            {title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-1 text-sm text-secondary-500">
          <MapPin className="size-4 text-primary-500" />
          <span>{city}, {address}</span>
        </div>

        {price && (
          <p className="text-primary-600 mb-4 text-xl font-bold">
            {new Intl.NumberFormat('sl-SI', {
              style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
            }).format(price)}
          </p>
        )}

        <div className="text-secondary-600 mb-4 flex gap-4 text-sm">
          {hasBedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="size-4 text-primary-400" />
              <span>Spalnica</span>
            </div>
          )}

          {hasBathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="size-4 text-primary-400" />
              <span>Kopalnica</span>
            </div>
          )}

          {size && (
            <div className="flex items-center gap-1">
              <div className="flex size-4 items-center justify-center text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/>
                  <path d="M21 3h-7.5v7.5H21V3z"/>
                  <path d="M13.5 13.5v7.5h7.5v-7.5h-7.5z"/>
                  <path d="M3 13.5h7.5v7.5H3v-7.5z"/>
                  <path d="M3 3h7.5v7.5H3V3z"/>
                </svg>
              </div>
              <span>{size} m²</span>
            </div>
          )}
        </div>

        <Link
          href={`/stanovanja/${slug}`}
          className="text-primary-600 flex items-center justify-end text-sm font-medium transition-all duration-300 hover:gap-2"
        >
          <span>Podrobnosti</span>
          <ArrowRight className="ml-1 size-3.5" />
        </Link>
      </div>
    </div>
  )
}

// Project Card (for Cities section)
const ProjectCard = ({
  name,
  image,
  count,
  slug,
}: {
  name: string
  image: string
  count: number
  slug: string
}) => (
  <Link href={`/projekti/${slug}`} className="group relative overflow-hidden rounded-lg">
    <div className="relative h-52 w-full transition-transform duration-300 group-hover:scale-105">
      <Image
        src={image || '/apartment-image.webp'}
        alt={name}
        fill
        className="rounded-lg object-cover brightness-75 transition-all duration-300 group-hover:brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm">{count} {count === 1 ? 'Nepremičnina' : (count > 1 && count < 5 ? 'Nepremičnine' : 'Nepremičnin')}</p>
      </div>
    </div>
  </Link>
)

const ProjectsSection = () => {
  const {
    projectFilters,
    currentProjects,
    updateCurrentProjects,
    updateProjectFilters,
    resetFilters,
  } = useAppStore()

  const [ isPending, startTransition ] = useTransition()

  const [ featuredProperties, setFeaturedProperties ] = useState<any[]>([])

  const fetchProjects = useCallback((filters: typeof projectFilters) => {
    startTransition(async () => {
      const projects = await getLocationsByCity(filters)

      updateCurrentProjects(Array.isArray(projects) ? projects : [])

      // Fetch real estate data from database
      const realEstates = await getAllRealEstates()

      setFeaturedProperties(Array.isArray(realEstates) ? realEstates : [])
    })
  }, [ startTransition, updateCurrentProjects ])

  const handleFilterRemove = (filter: string) => {
    const newFilters = {
      location: projectFilters.location === filter ? 'all' : projectFilters.location,
      type: projectFilters.type === filter ? 'all' : projectFilters.type,
    }

    updateProjectFilters(newFilters)
    fetchProjects(newFilters)
  }

  useEffect(() => {
    fetchProjects(projectFilters)
  }, [ projectFilters, fetchProjects ])

  return (
    <>
      {/* Projects (Cities) Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div>
              <h2 className="text-secondary-800 text-3xl font-bold sm:text-4xl">Najdi Projekte v Teh Lokacijah</h2>
              <p className="text-secondary-600 mt-2">Odkrijte naše stanovanjske projekte na različnih lokacijah</p>
            </div>

            <Link href="/projekti" className="text-primary-600 hover:text-primary-700 mt-4 flex items-center md:mt-0">
              <span className="font-medium">Ogled vseh lokacij</span>
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>

          {isPending ? (
            <div className="flex h-64 w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  image={project.images && project.images[0] ? `https://utfs.io/f/${project.images[0]}` : '/apartment-image.webp'}
                  count={3} // Mock count - in a real app you would get this from your data model
                  slug={project.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div>
              <h2 className="text-secondary-800 text-3xl font-bold sm:text-4xl">Izpostavljene Nepremičnine</h2>
              <p className="text-secondary-600 mt-2">Izbrane nepremičnine za vas</p>
            </div>
          </div>

          {/* Active Filters */}
          {(projectFilters.location !== 'all' || projectFilters.type !== 'all') && !isPending && (
            <div className="mb-8 flex flex-wrap items-center gap-2 rounded-lg border border-secondary-100 bg-white p-3 shadow-sm">
              <div className="text-secondary-600 mr-2 text-sm font-medium">Aktivni filtri:</div>
              {projectFilters.location && projectFilters.location !== 'all' && (
                <Badge className="text-secondary-700 flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1.5 text-xs">
                  <MapPin className="size-3 text-primary-500" />
                  {projectFilters.location}
                  <button
                    onClick={() => handleFilterRemove(projectFilters.location ?? '')}
                    className="ml-1 rounded-full p-0.5 hover:bg-secondary-200"
                  >
                    <CloseIcon className="size-3" />
                  </button>
                </Badge>
              )}
              {projectFilters.type && projectFilters.type !== 'all' && (
                <Badge className="text-secondary-700 flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1.5 text-xs">
                  <Home className="size-3 text-primary-500" />
                  {projectFilters.type === LocationType.Apartments ? 'Večstanovanjski objekt' : 'Hiša'}
                  <button
                    onClick={() => handleFilterRemove(projectFilters.type ?? '')}
                    className="ml-1 rounded-full p-0.5 hover:bg-secondary-200"
                  >
                    <CloseIcon className="size-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="ml-auto text-xs"
              >
                Počisti vse
              </Button>
            </div>
          )}

          {/* Properties Grid */}
          {!isPending && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.filter((property) => property.isExposed).map((property) => (
                <FeaturedPropertyCard
                  key={property.id}
                  title={property.name}
                  address={property.location?.address || 'Naslov ni na voljo'}
                  city={property.location?.city || 'Mesto ni na voljo'}
                  price={property.priceWithTax}
                  size={property.size}
                  image={property.images && property.images.length > 0 ? property.images[0] : null}
                  slug={property.slug}
                  spaces={property.spaces || []}
                />
              ))}
            </div>
          ) : isPending ? (
            <div className="flex h-64 w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <NoResultsBanner onReset={resetFilters} />
          )}
        </div>
      </section>
    </>
  )
}

export default ProjectsSection
