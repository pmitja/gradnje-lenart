'use client'

import { Location, RealEstate } from '@prisma/client'
import { ArrowRight, BadgeCheckIcon, Car, Expand, Home, Maximize2, ParkingCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel,
  CarouselContent,
  CarouselItem } from '@/components/ui/carousel'
import { formatNumber } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { StatusType } from '@/types/general'

interface LocationWithRealEstates extends Location {
  realEstates: RealEstate[]
}

interface PropertyDetails {
  price: string;
  type: string;
  location: string;
  size: string;
  hasBalcony: boolean;
  hasParking: boolean;
  hasGarage: boolean;
}

interface PropertyCardProps {
  realEstate: RealEstate;
  city: string;
  address: string;
  onClick: (realEstate: RealEstate) => void;
  isActive: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  realEstate,
  city,
  address,
  onClick,
  isActive = false,
}) => (
  <Button
    variant="outline"
    className={cn('flex min-w-fit flex-col gap-4 rounded-xl bg-primary-50 p-4 shadow-md lg:flex-row h-full w-full hover:bg-primary-75/25 border-4 border-transparent', isActive && 'border-4 border-primary-400')}
    onClick={() => onClick(realEstate)}
  >
    <Image
      src={`https://utfs.io/f/${realEstate.images[0]}`}
      alt={realEstate.name}
      width={200}
      height={200}
      className="aspect-square size-full max-h-[200px] rounded-2xl object-cover lg:max-w-[200px]"
    />
    <div className="flex min-w-fit flex-col place-content-start items-start gap-2">
      <h3 className="text-[38px] font-bold leading-[57px] text-primary-200">
        {formatNumber(Number(realEstate.priceWithTax))} €
      </h3>
      <span className="text-[28px] font-bold leading-8 text-secondary-400">
        {realEstate.name}
      </span>
      <span className="text-xs leading-3.5 text-secondary-200">
        {city}, {address}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge
          variant={'pills'}
          className='px-2 py-1 text-xs font-bold text-secondary-400'
        >
          <Expand size={16} />
          {realEstate.size} m²
        </Badge>
        <Badge
          variant={'pills'}
          className='px-2 py-1 text-xs font-bold text-secondary-400'
        >Balkon</Badge>
         <Badge
          variant={'pills'}
          className='px-2 py-1 text-xs font-bold text-secondary-400'
        >Parkirišče</Badge>
         <Badge
          variant={'pills'}
          className='px-2 py-1 text-xs font-bold text-secondary-400'
          >Garaža</Badge>
      </div>
    </div>
    {realEstate.status === StatusType.Rezervirano && <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">Rezervirano</div>}
  </Button>
)

interface DetailedPropertyViewProps extends PropertyDetails {
  imageSrc: string;
  name: string;
  description: string;
}

const DetailedPropertyView: React.FC<DetailedPropertyViewProps> = ({
  imageSrc,
  name,
  price,
  type,
  location,
  size,
  hasBalcony,
  hasParking,
  hasGarage,
  description,
}) => (
  <Card className="mt-8 w-full bg-primary-50">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Image
            src={`https://utfs.io/f/${imageSrc}`}
            alt={name}
            width={800}
            height={600}
            className='max-h-[600px] w-full rounded-xl object-cover'
          />
        </div>
        <div className='text-secondary-400'>
          <h2 className="mb-2 text-2xl font-bold">{type}</h2>
          <h3 className="mb-4 text-3xl font-bold text-primary-200">{price} €</h3>
          <p className="mb-4 text-gray-600">{location}</p>
          <div className="mb-4 flex flex-wrap gap-4">
          <Badge
          variant={'pills'} className="flex items-center gap-2">
              <Maximize2 size={20} />
              <span>{size} m²</span>
            </Badge>
            {hasBalcony && <Badge
          variant={'pills'} className="flex items-center gap-2">
              <Home size={20} />
              <span>Balkon</span>
            </Badge>}
            {hasParking && <Badge
          variant={'pills'} className="flex items-center gap-2">
              <ParkingCircle size={20} />
              <span>Parkirišče</span>
            </Badge>}
            {hasGarage && <Badge
          variant={'pills'} className="flex items-center gap-2">
              <Car size={20} />
              <span>Garaža</span>
            </Badge>}
          </div>
          <p className="mb-4 text-gray-700">{description}</p>
          <div className="flex gap-4">
            <Button
              variant={'primary'}
              className='flex gap-3'
            >
              <BadgeCheckIcon />
              Rezerviraj
            </Button>
            <Button variant={'secondary'}>
              Ogled <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const RealEstateListing = ({ location }: { location: LocationWithRealEstates }) => {
  const [ selectedProject, setSelectedProject ] = useState<RealEstate>(location.realEstates[0])

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Nepremičnine</h1>
      <Carousel className='w-full'>
        <CarouselContent className='mb-2 ml-1 flex gap-8'>
          {location.realEstates.map((realEstate) => (
            <CarouselItem
              key={realEstate.id}
              className='min-w-fit shrink p-0'
            >
              <PropertyCard
                key={realEstate.id}
                realEstate={realEstate}
                city={location.city}
                address={location.address}
                onClick={setSelectedProject}
                isActive={selectedProject.id === realEstate.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {selectedProject && <DetailedPropertyView
        price={formatNumber(Number(selectedProject.priceWithTax))}
        type={selectedProject.name}
        location={`${location.city}, ${location.address}`}
        size={selectedProject.size?.toString() || ''}
        imageSrc={selectedProject.images[0]}
        name={selectedProject.name}
        hasBalcony={true}
        hasParking={true}
        hasGarage={true}
        description={selectedProject.description || ''}
      />
    }
    </div>
  )
}

export default RealEstateListing
