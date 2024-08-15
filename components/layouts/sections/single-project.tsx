'use client'

import SectionWithTitleOnLeft from '@/components/layouts/sections/title-left'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { formatNumber } from '@/lib/helpers'
import { Location, RealEstate } from '@prisma/client'
import { ArrowRight, BadgeCheckIcon, Expand } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const RealEstateCard = ({
  realEstate,
  city,
  address,
  onClick
}: {
  realEstate: RealEstate
  city: string
  address: string
  onClick: (realEstate: RealEstate) => void
}) => {
  return (
    <Button
      variant='plain'
      size='plain'
      className='flex min-w-fit flex-col gap-4 rounded-xl bg-primary-50 p-4 shadow-md lg:flex-row'
      onClick={() => onClick(realEstate)}
    >
      <Image
        src={`https://utfs.io/f/${realEstate.images[0]}`}
        alt={realEstate.name}
        width={200}
        height={200}
        className='aspect-square h-full max-h-[200px] w-full max-w-[200px] rounded-2xl object-cover'
      />
      <div className='flex min-w-fit flex-col place-content-start items-start gap-2'>
        <h3 className='text-[38px] font-bold leading-[57px] text-primary-200'>
          {formatNumber(Number(realEstate.priceWithTax))} €
        </h3>
        <span className='text-[28px] font-bold leading-8 text-secondary-400'>
          {realEstate.name}
        </span>
        <span className='text-xs leading-3.5 text-secondary-200'>
          {city}, {address}
        </span>
      </div>
    </Button>
  )
}

interface LocationWithRealEstates extends Location {
  realEstates: RealEstate[]
}

const SingleProject = ({ location }: { location: LocationWithRealEstates }) => {
  const [selectedProject, setSelectedProject] = useState<RealEstate>(location.realEstates[0])

  return (
    <>
      {location.realEstates.length > 0 && (
        <SectionWithTitleOnLeft title={'Nepremičnine'}>
          <Carousel className='w-full'>
            <CarouselContent className='-ml-1 mb-2 flex gap-8'>
              {location.realEstates.map((realEstate) => (
                <CarouselItem
                  key={realEstate.id}
                  className='min-w-fit shrink p-0'
                >
                  <RealEstateCard
                    key={realEstate.id}
                    realEstate={realEstate}
                    city={location.city}
                    address={location.address}
                    onClick={setSelectedProject}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className='mt-5'>
            {selectedProject && (
              <Card className='bg-primary-50'>
                <CardContent className='flex flex-col gap-5 p-5'>
                  <Image
                    src={`https://utfs.io/f/${selectedProject.images[0]}`}
                    alt={selectedProject.name}
                    width={800}
                    height={600}
                    className='max-h-[400px] w-full rounded-xl object-cover'
                  />
                  <div className='grid grid-cols-2'>
                    <div className='flex min-w-fit flex-col place-content-center gap-2'>
                      <span className='text-[28px] font-bold leading-8 text-secondary-400'>
                        {selectedProject.name}
                      </span>
                      <h3 className='text-[38px] font-bold leading-[57px] text-primary-200'>
                        {formatNumber(Number(selectedProject.priceWithTax))} €
                      </h3>
                      <span className='text-xs leading-3.5 text-secondary-200'>
                        {location.city}, {location.address}
                      </span>
                      <div className='flex flex-wrap gap-2'>
                        <Badge
                          variant={'pills'}
                          className='text-base font-bold leading-4.5 text-secondary-400'
                        >
                          <Expand />
                          {selectedProject.size} m²
                        </Badge>
                      </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                      <span className='text-xs leading-3.5 text-secondary-200'>Opis:</span>
                      <p className='text-[18px] leading-7 text-secondary-400'>
                        {selectedProject.description}
                      </p>
                      <div className='flex flex-wrap gap-3'>
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
            )}
          </div>
        </SectionWithTitleOnLeft>
      )}
    </>
  )
}

export default SingleProject
