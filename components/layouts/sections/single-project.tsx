'use client'

import { Location, RealEstate } from '@prisma/client'
import { ArrowRight, BedIcon, Car, Home, InfoIcon, KeySquare, Loader, Maximize2, PackageOpen, TableIcon, TvIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

import ReservationDialog from '@/app/(public)/projekt/[slug]/[id]/_components/ReservationDialog'
import NoResultComponent from '@/components/common/no-results-banner'
import PropertyFilter from '@/components/common/property-filter'
import DiningIcon from '@/components/icons/dining'
import KitchenIcon from '@/components/icons/kitchen'
import ShowerIcon from '@/components/icons/shower'
import WcIcon from '@/components/icons/wc'
import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatNumber } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app'
import { SpacesType, StatusType } from '@/types/general'

export const rooms = [
  {
    icon: <TableIcon className="size-6" />,
    label: SpacesType.Room,
  },
  {
    icon: <ShowerIcon className="size-6" />,
    label: SpacesType.Bathroom,
  },
  {
    icon: <WcIcon className="size-6" />,
    label: SpacesType.WC,
  },
  {
    icon: <BedIcon className="size-6" />,
    label: SpacesType.Bedroom,
  },
  {
    icon: <KitchenIcon className="size-6" />,
    label: SpacesType.Kitchen,
  },
  {
    icon: <DiningIcon className="size-6" />,
    label: SpacesType.DinningRoom,
  },
  {
    icon: <TvIcon className="size-6" />,
    label: SpacesType.LivingRoom,
  },
  {
    icon: <Home className="size-6" />,
    label: SpacesType.Balcony,
  },
  {
    icon: <Home className="size-6" />,
    label: SpacesType.Terrace,
  },
  {
    icon: <PackageOpen className="size-6" />,
    label: SpacesType.Storage,
  },
  {
    icon: <Car className="size-6" />,
    label: SpacesType.Parking,
  },
]

interface LocationWithRealEstates extends Location {
  realEstates: RealEstate[]
}

interface PropertyDetails {
  price: string
  type: string
  location: string
  size: string
  spaces?: string[] | null
}

interface PropertyCardProps {
  realEstate: RealEstate
  city: string
  address: string
  onClick: (_realEstate: RealEstate) => void
  isActive: boolean
  spaces?: string[] | null
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  realEstate,
  city,
  address,
  onClick,
  isActive = false,
  spaces,
}) => (
  <div
    className={cn(
      'group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md',
      isActive && 'ring-2 ring-primary-400 ring-offset-2',
    )}
    onClick={() => onClick(realEstate)}
  >
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        src={realEstate.images[0] ? `https://utfs.io/f/${realEstate.images[0]}` : '/no-image.webp'}
        alt={realEstate.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {realEstate.status === StatusType.Rezervirano && (
        <div className="absolute inset-x-0 top-0 bg-orange-500 py-1.5 text-center text-sm font-medium text-white">
          Rezervirano
        </div>
      )}
      {realEstate.status === StatusType.Prodano && (
        <div className="absolute inset-x-0 top-0 bg-destructive-500 py-1.5 text-center text-sm font-medium text-white">
          Prodano
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-secondary-700 text-xl font-bold">{realEstate.name}</h3>
        {realEstate.size && (
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Maximize2 className="size-3" />
            {realEstate.size} m²
          </Badge>
        )}
      </div>

      <p className="mb-2 text-sm text-gray-500">
        {city}, {address}
      </p>
      {spaces && spaces.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {spaces.slice(0, 3).map((space, index) => {
            const matchingRoom = rooms.find((room) => room.label === space)

            return matchingRoom ? (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 text-xs"
              >
                {matchingRoom.icon}
                <span className="hidden sm:inline">{space}</span>
              </Badge>
            ) : null
          })}
          {spaces.length > 3 && (
            <Badge variant="outline" className="px-2 py-1 text-xs">
              +{spaces.length - 3}
            </Badge>
          )}
        </div>
      )}

      <div className="mt-auto">
        <p className="text-2xl font-bold">
          {formatNumber(Number(realEstate.priceWithTax))} €
        </p>
      </div>

      <Button
        variant="ghost"
        className="mt-3 w-full justify-between bg-primary-50 hover:bg-primary-100"
        onClick={(e) => {
          e.stopPropagation()
          onClick(realEstate)
        }}
      >
        Podrobnosti <ArrowRight className="size-4" />
      </Button>
    </div>
  </div>
)

interface DetailedPropertyViewProps extends PropertyDetails {
  imageSrc: string
  name: string
  description: string
  url: string
  status?: string | null
  id: string
}

const DetailedPropertyView: React.FC<DetailedPropertyViewProps> = ({
  imageSrc,
  name,
  price,
  type,
  location,
  size,
  spaces,
  description,
  status,
  url,
  id,
}) => (
  <Card className="overflow-hidden border border-gray-200 bg-white shadow-lg">
    <CardContent className="p-0">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="relative aspect-video lg:aspect-auto">
          <Image
            src={imageSrc ? `https://utfs.io/f/${imageSrc}` : '/no-image.webp'}
            alt={name}
            fill
            className="object-cover"
          />
          {status && status === StatusType.Rezervirano && (
            <div className="absolute inset-x-0 top-0 bg-orange-500 py-2 text-center font-medium text-white">
              Rezervirano
            </div>
          )}
          {status && status === StatusType.Prodano && (
            <div className="absolute inset-x-0 top-0 bg-destructive-500 py-2 text-center font-medium text-white">
              Prodano
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 lg:p-8">
          <div>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-secondary-800 text-2xl font-bold">{type}</h2>
                <p className="text-sm text-gray-600">{location}</p>
              </div>
              <h3 className="text-primary-600 rounded-lg bg-primary-50 px-4 py-2 text-3xl font-bold">{price} €</h3>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {size && (
                <Badge variant="outline" className="flex items-center gap-2 bg-gray-50 px-3 py-1.5">
                  <Maximize2 size={16} className="text-primary-500" />
                  <span>{size} m²</span>
                </Badge>
              )}

              {spaces && spaces.map((space, index) => {
                const matchingRoom = rooms.find((room) => room.label === space)

                return matchingRoom ? (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 bg-gray-50 px-3 py-1.5"
                  >
                    {React.cloneElement(matchingRoom.icon as React.ReactElement, {
                      className: 'text-primary-500 size-4',
                    })}
                    <span>{space}</span>
                  </Badge>
                ) : null
              })}
            </div>

            {description && (
              <div className="mb-6 border-t border-gray-100 pt-5">
                <h4 className="text-secondary-700 mb-3 flex items-center gap-2 font-semibold">
                  <InfoIcon className="size-4 text-primary-500" />
                  O nepremičnini
                </h4>
                <p className="text-gray-700">{description}</p>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            {status && status === StatusType.Rezervirano && (
              <div className="mb-4 rounded-lg bg-orange-50 p-4">
                <div className="flex gap-3">
                  <InfoIcon className="mt-0.5 size-5 shrink-0 text-orange-500" />
                  <p className="text-sm text-orange-800">
                    V primeru sprostitve rezervacije se prosim prijavite v čakalno listo.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="primary">Obvesti me</Button>
                  <Link href={url}>
                    <Button variant="ghost" className="w-full justify-between gap-2 bg-primary-50 hover:bg-primary-100">
                      Podrobnejši ogled <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {status !== StatusType.Prodano && status !== StatusType.Rezervirano && (
              <div className="flex flex-wrap gap-3">
                <ReservationDialog realEstateId={id}>
                  <Button variant="primary" className="gap-2">
                    <KeySquare className="size-4" />
                    Rezerviraj
                  </Button>
                </ReservationDialog>

                <Link href={url}>
                  <Button variant="ghost" className="w-full justify-between gap-2 bg-primary-50 hover:bg-primary-100">
                    Podrobnejši ogled <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            )}

            {status === StatusType.Prodano && (
              <div className="flex flex-wrap gap-3">
                <Link href={url}>
                  <Button variant="ghost" className="w-full justify-between gap-2 bg-primary-50 hover:bg-primary-100">
                    Podrobnejši ogled <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const RealEstateListing = ({
  location,
  slug,
}: {
  location: LocationWithRealEstates
  slug: string
}) => {
  const {
    propertyFilters,
    updatePropertyFilters,
    isFilterLoading,
    setFilterLoading,
  } = useAppStore()

  const [ selectedProject, setSelectedProject ] = useState<RealEstate | null>(null)

  const isDesktop = useMediaQuery('(min-width: 1120px)')

  const filteredRealEstates = useMemo(
    () => location.realEstates.filter((realEstate) => {
      const { floor, size, priceRange, availability } = propertyFilters

      const floorMatch = !floor || floor === 'Vsa' || realEstate.floor === floor

      const sizeMatch = !size || realEstate.name.includes(size)

      const priceMatch = !priceRange
          || (Number(realEstate.priceWithTax) >= priceRange[0]
            && Number(realEstate.priceWithTax) <= priceRange[1])

      const availabilityMatch = !availability || realEstate.status === availability

      return floorMatch && sizeMatch && priceMatch && availabilityMatch
    }),
    [ location.realEstates, propertyFilters ],
  )

  const resetFilters = () => {
    updatePropertyFilters({
      floor: undefined,
      size: undefined,
      priceRange: undefined,
      availability: undefined,
      isReseted: true,
    })
  }

  useEffect(() => {
    if (filteredRealEstates.length > 0 && !selectedProject) {
      setSelectedProject(filteredRealEstates[0])
    } else if (filteredRealEstates.length === 0) {
      setSelectedProject(null)
    } else if (selectedProject && !filteredRealEstates.includes(selectedProject)) {
      setSelectedProject(filteredRealEstates[0])
    }

    if (isFilterLoading) {
      setTimeout(() => {
        setFilterLoading(false)
      }, 500)
    }
  }, [ filteredRealEstates, selectedProject, isFilterLoading, setFilterLoading ])

  if (filteredRealEstates.length === 0) {
    return (
      <div className="space-y-6">
        <PropertyFilter type={location.type} />
        <NoResultComponent onReset={resetFilters} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-gray-50 p-4">
        {isDesktop ? (
          <PropertyFilter type={location.type} />
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-secondary-700 px-0 py-2 text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary-100 p-1.5">
                    <TableIcon className="text-primary-600 size-4" />
                  </div>
                  Filtri
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <PropertyFilter isDesktop={isDesktop} type={location.type} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <section className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary-100 p-2">
              <Home className="text-primary-600 size-5" />
            </div>
            <h2 className="text-secondary-700 text-xl font-bold lg:text-2xl">
              Nepremičnine ({filteredRealEstates.length})
            </h2>
          </div>
        </div>

        {isFilterLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-6 shadow-lg">
              <Loader className="size-10 animate-spin text-primary-400" />
              <p className="text-secondary-700 text-base font-medium">Filtriranje nepremičnin...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRealEstates.map((realEstate) => (
            <PropertyCard
              key={realEstate.id}
              realEstate={realEstate}
              city={location.city}
              address={location.address}
              onClick={setSelectedProject}
              isActive={selectedProject?.id === realEstate.id}
              spaces={realEstate.spaces}
            />
          ))}
        </div>

        {selectedProject && (
          <div className="mt-8">
            <h3 className="text-secondary-700 mb-4 text-lg font-semibold">Podrobnosti izbrane nepremičnine</h3>
            <DetailedPropertyView
              price={formatNumber(Number(selectedProject.priceWithTax))}
              type={selectedProject.name}
              location={`${location.city}, ${location.address}`}
              size={selectedProject.size?.toString() || ''}
              imageSrc={selectedProject.images[0]}
              name={selectedProject.name}
              spaces={selectedProject.spaces}
              description={selectedProject.shortDescription || ''}
              url={`${slug}/${selectedProject.id}`}
              status={selectedProject.status}
              id={selectedProject.id}
            />
          </div>
        )}
      </section>
    </div>
  )
}

export default RealEstateListing
