'use client'

import { Location, RealEstate } from '@prisma/client'
import { ArrowRight, BadgeCheckIcon, BedIcon, Car, Home, InfoIcon, Maximize2, PackageOpen, TableIcon, TvIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

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
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
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
  onClick: (realEstate: RealEstate) => void
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
  <Button
    variant="outline"
    className={cn(
      'grid h-full w-full grid-cols-1 gap-4 rounded-xl border-4 border-transparent bg-primary-50 p-4 shadow-md hover:bg-primary-75/25 sm:w-[280px]',
      isActive && 'border-4 border-primary-400',
    )}
    onClick={() => onClick(realEstate)}
  >
    <div className="relative size-full min-h-[150px]">
      <Image
        src={realEstate.images[0] ? `https://utfs.io/f/${realEstate.images[0]}` : '/no-image.webp'}
        alt={realEstate.name}
        fill
        className="relative aspect-square size-full max-h-[200px] rounded-2xl object-cover"
      />

      {realEstate.status === StatusType.Rezervirano && (
        <div className="absolute right-0 top-0 w-full rounded-t-2xl bg-orange-100 px-2 py-1 text-xs text-orange-800">
          Rezervirano
        </div>
      )}
      {realEstate.status === StatusType.Prodano && (
        <div className="absolute right-0 top-0 w-full rounded-t-2xl bg-destructive-200 px-2 py-1 text-xs text-white">
          Prodano
        </div>
      )}
    </div>
    <div className="flex min-w-fit flex-col place-content-start items-start gap-2">
      <h3 className="text-[38px] font-bold leading-[57px] text-primary-200">
        {formatNumber(Number(realEstate.priceWithTax))} €
      </h3>
      <span className="text-start text-[28px] font-bold leading-8 text-secondary-400">
        {realEstate.name}
      </span>
      <span className="text-xs leading-3.5 text-secondary-200">
        {city}, {address}
      </span>
      {spaces && (
        <div className="grid grid-cols-3 gap-2">
          {spaces.slice(0, 3).map((space, index) => {
            const matchingRoom = rooms.find((room) => room.label === space)

            return (
              <Badge
                key={index}
                variant={'pills'}
                className="px-2 py-1 text-xs font-bold text-secondary-400"
              >
                {matchingRoom ? matchingRoom.icon : null}
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  </Button>
)

interface DetailedPropertyViewProps extends PropertyDetails {
  imageSrc: string
  name: string
  description: string
  url: string
  status?: string | null
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
}) => (
  <Card className="w-full bg-primary-50">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative">
          <Image
            src={imageSrc ? `https://utfs.io/f/${imageSrc}` : '/no-image.webp'}
            alt={name}
            width={800}
            height={600}
            className="max-h-[600px] w-full rounded-xl object-cover"
          />
          {status && status === StatusType.Rezervirano && (
            <div className="absolute right-0 top-0 w-full rounded-t-xl bg-orange-100 p-2.5 text-center font-semibold text-orange-800">
              Rezervirano
            </div>
          )}
          {status && status === StatusType.Prodano && (
            <div className="absolute right-0 top-0 w-full rounded-t-xl bg-destructive-200 p-2.5 text-center font-semibold text-white">
              Prodano
            </div>
          )}
        </div>
        <div className="text-secondary-400">
          <h2 className="mb-2 text-2xl font-bold">{type}</h2>
          <h3 className="mb-4 text-3xl font-bold text-primary-200">{price} €</h3>
          <p className="mb-4 text-gray-600">{location}</p>
          {status && status === StatusType.Rezervirano && (
            <div className="mb-4 flex flex-col items-center gap-y-4">
              <div className="flex w-full place-content-center items-start gap-2 rounded-md border border-secondary-200 bg-informative-50 p-2.5 text-secondary-200">
                <InfoIcon className="shrink-0" size={20} />
                <p className="text-sm">
                  V primeru sprostitve rezervacije se prosim prijavite v čakalno listo.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant={'primary'}>Obvesti me</Button>
                <Link href={url}>
                  <Button asChild variant={'secondary'}>
                    <span>
                      Ogled <ArrowRight />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {status !== StatusType.Prodano && status !== StatusType.Rezervirano && (
            <div className="mb-4 flex flex-wrap gap-4">
              <Button variant={'primary'} className="flex gap-3">
                <BadgeCheckIcon />
                Rezerviraj
              </Button>
              <Link href={url}>
                <Button asChild variant={'secondary'}>
                  <span>
                    Ogled <ArrowRight />
                  </span>
                </Button>
              </Link>
            </div>
          )}
          {status === StatusType.Prodano && (
            <div className="mb-4 flex flex-wrap gap-4">
              <Link href={url}>
                <Button asChild variant={'secondary'}>
                  <span>
                    Ogled <ArrowRight />
                  </span>
                </Button>
              </Link>
            </div>
          )}
          <p className="mb-4 text-gray-700">{description}</p>
          <div className="mb-4 flex flex-wrap gap-4">
            <Badge variant={'pills'} className="flex items-center gap-2">
              <Maximize2 size={20} />
              <span>{size} m²</span>
            </Badge>
            {spaces && (
              <div className="flex flex-wrap gap-2">
                {spaces.map((space, index) => {
                  const matchingRoom = rooms.find((room) => room.label === space)

                  return (
                    <Badge key={index} variant={'pills'} className="flex items-center gap-2 text-sm">
                      {matchingRoom ? matchingRoom.icon : null}
                      <span className="text-sm">{space}</span>
                    </Badge>
                  )
                })}
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
  const { propertyFilters, updatePropertyFilters } = useAppStore()

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
  }, [ filteredRealEstates, selectedProject ])

  if (filteredRealEstates.length === 0) {
    return (
      <>
        <PropertyFilter />
        <NoResultComponent onReset={resetFilters} />
      </>
    )
  }

  return (
    <>
      {isDesktop ? (
        <PropertyFilter />
      ) : (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold data-[state=open]:bg-transparent lg:text-3xl">
              Filtri
            </AccordionTrigger>
            <AccordionContent className="data-[state=open]:bg-transparent">
              <PropertyFilter isDesktop={isDesktop} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <section className="flex w-full flex-col gap-3 lg:gap-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-secondary-400 lg:text-3xl">
          <Home size={32} className="size-4 lg:size-8" /> Nepremičnine
        </h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {filteredRealEstates.map((realEstate) => (
              <CarouselItem key={realEstate.id} className="pl-4 sm:basis-auto">
                <PropertyCard
                  realEstate={realEstate}
                  city={location.city}
                  address={location.address}
                  onClick={setSelectedProject}
                  isActive={selectedProject?.id === realEstate.id}
                  spaces={realEstate.spaces}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {selectedProject && (
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
          />

        )}
      </section>
    </>
  )
}

export default RealEstateListing
