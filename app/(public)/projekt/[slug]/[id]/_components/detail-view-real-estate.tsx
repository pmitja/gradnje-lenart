'use client'

import { Calendar, Car, Check, Euro, InfoIcon, KeySquare, Maximize2, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import DocumentIcon from '@/components/icons/document'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { rooms } from '@/lib/utils/rooms'
import { LocationType, SpacesType, StatusType } from '@/types/general'

import PropertyMap from './property-map'
import RealEstateImages from './real-estate-images'
import ReservationDialog from './ReservationDialog'
import WaitingListDialog from './WaitingListDialog'

interface PropertyDetail {
  icon: React.ReactNode
  label: string
  value: string
}

const DetailViewRealEstate = ({
  id,
  description,
  technicalData,
  city,
  address,
  files,
  spaces,
  status,
  price,
  lastTimeReserved,
  energyLevel,
  parkingSpaces,
  size,
  images,
  type,
}: {
  id: string
  description: string
  technicalData: { id: string; text: string }[]
  city: string
  address: string
  files?: { name: string; key: string }[]
  spaces?: SpacesType[]
  status?: string | null
  price: number | null
  lastTimeReserved: Date
  energyLevel: string | null
  parkingSpaces: number | null
  size: number | null
  images: string[]
  type: LocationType
}) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const details: PropertyDetail[] = type === LocationType.Apartments ? [
    {
      icon: <Euro className="text-primary-300" />,
      label: 'Cena',
      value: price ? `${price.toLocaleString('sl-SI')} €` : 'N/A',
    },
    {
      icon: <Maximize2 className="text-primary-300" />,
      label: 'Velikost',
      value: `${size} m²`,
    },
    {
      icon: <Calendar className="text-primary-300" />,
      label: 'Nazadnje rezervirano',
      value: lastTimeReserved.toLocaleDateString('sl-SI'),
    },
    {
      icon: <Zap className="text-primary-300" />,
      label: 'Enegretsko varčna',
      value: String(energyLevel),
    },
    {
      icon: <Car className="text-primary-300" />,
      label: 'Število parkirnih mest',
      value: String(parkingSpaces),
    },
  ] : [
    {
      icon: <Euro className="text-primary-300" />,
      label: 'Cena',
      value: price ? `${price.toLocaleString('sl-SI')} €` : 'N/A',
    },
    {
      icon: <Maximize2 className="text-primary-300" />,
      label: 'Velikost',
      value: `${size} m²`,
    },
    {
      icon: <Calendar className="text-primary-300" />,
      label: 'Nazadnje rezervirano',
      value: lastTimeReserved.toLocaleDateString('sl-SI'),
    },
    {
      icon: <Zap className="text-primary-300" />,
      label: 'Enegretsko varčna',
      value: String(energyLevel),
    },
  ]

  return (
    <div className="relative">
      {/* Sold Status Overlay */}
      {status && status === StatusType.Prodano && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 rounded-xl bg-destructive-200/95 p-10 text-white backdrop-blur-sm transition-all">
          <h3 className="text-2xl font-semibold uppercase tracking-wider lg:text-4xl">
            {StatusType.Prodano}
          </h3>
          <Button
            variant={'secondary'}
            onClick={handleBack}
            className="w-fit border-white bg-white/10 px-6 py-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Pojdi nazaj
          </Button>
        </div>
      )}
      
      <div
        className={cn(
          'relative flex flex-col gap-8 md:gap-10 lg:gap-12',
          status === StatusType.Prodano && 'opacity-10',
        )}
      >
        {/* Reserved Status Banner */}
        {status && status === StatusType.Rezervirano && (
          <div className="flex flex-col items-center gap-y-4">
            <div className="w-full rounded-xl bg-gradient-to-r from-destructive-300 to-destructive-200 p-4 text-center text-white shadow-lg">
              <h3 className="text-xl font-semibold leading-none tracking-tight lg:text-2xl">
                {type === LocationType.Apartments ? 'Stanovanje je trenutno rezervirano.' : 'Hiša je trenutno rezervirana.'}
              </h3>
            </div>

            <div className="flex w-full place-content-center items-start gap-3 rounded-xl border border-secondary-200 bg-informative-50 p-4 text-secondary-200 shadow-sm">
              <InfoIcon className="mt-0.5 shrink-0" size={20} />
              <p className="text-sm">
                V primeru sprostitve rezervacije se prosim prijavite v čakalno listo.
              </p>
            </div>

            <WaitingListDialog realEstateId={id}>
              <Button variant={'primary'} className="mt-2 px-8 py-2.5 shadow-lg transition-transform hover:scale-105">
                Zanimam se
              </Button>
            </WaitingListDialog>
          </div>
        )}
        
        {/* Property Images */}
        <div className="overflow-hidden rounded-xl shadow-lg">
          <RealEstateImages images={images} />
        </div>
        
        {/* Property Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-3xl">
            Podrobni podatki o nepremični
          </h2>
          <Card className="overflow-hidden rounded-xl border-none bg-gradient-to-br from-primary-50 to-primary-75/30 shadow-md">
            <CardContent className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-wrap gap-6 lg:gap-8">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex basis-full items-center gap-4 border-b border-secondary-100/50 pb-4 md:basis-[calc(50%-1rem)] md:border-b-0 md:border-r md:pb-0 lg:basis-auto lg:gap-5 lg:pr-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-75/40 p-3">
                      {detail.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-secondary-300">{detail.label}</span>
                      <span className="text-lg font-semibold text-secondary-400">{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spaces/Rooms */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-2xl">
            Prostori
          </h2>
          {spaces && (
            <div className="flex flex-wrap gap-2">
              {spaces.map((space, index) => {
                const matchingRoom = rooms.find((room) => room.label === space)

                return (
                  <Badge
                    key={index}
                    variant="heroPills"
                    className="flex items-center gap-2.5 rounded-full bg-secondary-50 px-4 py-2 text-base font-medium text-secondary-400 shadow-sm transition-colors hover:bg-secondary-75"
                  >
                    {matchingRoom ? matchingRoom.icon : null}
                    <span>{space}</span>
                  </Badge>
                )
              })}
            </div>
          )}
        </section>

        {/* Description */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-2xl">
            Podrobni opis
          </h2>
          <Card className="rounded-xl border-none bg-white p-6 shadow-md">
            <p className="text-secondary-300 leading-relaxed">{description}</p>
          </Card>
        </section>

        {/* Technical Data */}
        {technicalData.length > 0 && 
          <section className="space-y-4">
            <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-2xl">
              Tehnični podatki
            </h2>
            <Card className="rounded-xl border-none bg-white p-6 shadow-md">
              <ul className="grid grid-cols-1 gap-4 text-secondary-300 sm:grid-cols-2 md:grid-cols-3">
                {technicalData.map((data, index) => (
                  <li className="flex items-start gap-3" key={index}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-75">
                      <Check className="h-4 w-4 text-primary-300" />
                    </div>
                    <span className="mt-0.5">{data.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        }

        {/* Location and Documents */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="space-y-4">
            <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-2xl">
              Lokacija
            </h2>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <PropertyMap address={address} city={city} />
            </div>
          </section>
          
          {files && files?.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="text-xl font-bold leading-tight text-secondary-400 lg:text-2xl">
                Dokumenti
              </h2>
              <Card className="flex flex-1 flex-col justify-between rounded-xl border-none bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <DocumentIcon className="text-primary-300" />
                      <div className="flex flex-wrap gap-2">
                        {files.map((file, index) => (
                          <a 
                            href={`https://utfs.io/f/${file.key}`} 
                            target="_blank" 
                            key={index}
                            className="inline-flex rounded-md bg-secondary-50 px-3 py-1.5 text-sm font-medium text-secondary-400 transition-colors hover:bg-secondary-75"
                          >
                            {file.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button 
                    variant="secondary" 
                    className="w-full rounded-lg border-secondary-200 bg-secondary-50 py-2.5 shadow-sm transition-colors hover:bg-secondary-75"
                  >
                    Vstopite v stik
                  </Button>
                </div>
              </Card>
            </section>
          )}
        </div>
        
        {/* Reservation Button */}
        {status !== StatusType.Prodano && status !== StatusType.Rezervirano && (
          <div className="flex justify-center py-6">
            <ReservationDialog realEstateId={id}>
              <Button 
                variant="primary" 
                className="px-8 py-3 text-lg shadow-lg transition-transform hover:scale-105"
              >
                <KeySquare className="mr-3 size-5" />
                Rezerviraj nepremičnino
              </Button>
            </ReservationDialog>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailViewRealEstate
