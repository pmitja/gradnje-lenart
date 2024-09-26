'use client'

import { Calendar, Car, Check, Euro, InfoIcon, KeySquare, Maximize2, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import ButtonWithIcon from '@/components/common/button-with-icon'
import DocumentIcon from '@/components/icons/document'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { rooms } from '@/lib/utils/rooms'
import { SpacesType, StatusType } from '@/types/general'

import PropertyMap from './property-map'
import RealEstateImages from './real-estate-images'

interface PropertyDetail {
  icon: React.ReactNode
  label: string
  value: string
}

const DetailViewRealEstate = ({
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
}: {
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
}) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const details: PropertyDetail[] = [
    {
      icon: <Euro className="size-2 md:size-4 lg:size-6" />,
      label: 'Cena',
      value: price ? `${price.toLocaleString('sl-SI')} €` : 'N/A',
    },
    {
      icon: <Maximize2 className="size-2 md:size-4 lg:size-6" />,
      label: 'Velikost',
      value: `${size} m²`,
    },
    {
      icon: <Calendar className="size-2 md:size-4 lg:size-6" />,
      label: 'Nazadnje rezervirano',
      value: lastTimeReserved.toLocaleDateString('sl-SI'),
    },
    {
      icon: <Zap className="size-2 md:size-4 lg:size-6" />,
      label: 'Enegretsko varčna',
      value: String(energyLevel),
    },
    {
      icon: <Car className="size-2 md:size-4 lg:size-6" />,
      label: 'Število parkirnih mest',
      value: String(parkingSpaces),
    },
  ]

  return (
    <div className="relative mt-8">
      {status && status === StatusType.Prodano && (
        <div className="absolute z-50 flex w-full flex-col items-center gap-5 rounded-md bg-destructive-200 p-10 text-white">
          <h3 className="text-xl font-semibold uppercase leading-none tracking-tight lg:text-3xl">
            {StatusType.Prodano}
          </h3>
          <Button
            variant={'secondary'}
            onClick={handleBack}
            className="w-fit border-white text-white"
          >
            Pojdi nazaj
          </Button>
        </div>
      )}
      <div
        className={cn(
          'relative flex flex-col gap-3 md:gap-6 lg:mt-14 lg:space-y-10',
          status === StatusType.Prodano && 'opacity-10',
        )}
      >
        {status && status === StatusType.Rezervirano && (
          <div className="flex flex-col items-center gap-y-4">
            <div className="w-full rounded-md bg-destructive-200 p-2.5 text-center text-white">
              <h3 className="text-xl font-semibold leading-none tracking-tight lg:text-3xl">
                Stanovanje je trenutno rezervirano.
              </h3>
            </div>

            <div className="flex w-full place-content-center items-start gap-2 rounded-md border border-secondary-200 bg-informative-50 p-2.5 text-secondary-200">
              <InfoIcon className="shrink-0" size={20} />
              <p className="text-sm">
                V primeru sprostitve rezervacije se prosim prijavite v čakalno listo.
              </p>
            </div>

            <Button variant={'primary'}>Zanimam se</Button>
          </div>
        )}
        <RealEstateImages images={images} />
        <h3 className="text-xl font-bold leading-none tracking-tight text-secondary-400 lg:text-3xl">
          Podrobni podatki o nepremični
        </h3>
        <Card className="rounded-[32px] border border-secondary-75 bg-primary-50">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-wrap gap-4">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex basis-full items-center gap-3 border-secondary-100 pr-5 md:basis-auto md:border-r lg:gap-5 lg:pr-10"
                >
                  {detail.icon}
                  <div className="flex flex-col items-start gap-1 lg:gap-2">
                    <span className="text-sm text-gray-500">{detail.label}</span>
                    <span className="font-medium text-primary-300">{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold leading-none tracking-tight text-secondary-400 lg:text-2xl">
            Prostori
          </h3>
          {spaces && (
            <div className="flex flex-wrap gap-2">
              {spaces.map((space, index) => {
                const matchingRoom = rooms.find((room) => room.label === space)

                return (
                  <Badge
                    key={index}
                    variant="heroPills"
                    className="flex items-center gap-2.5 px-2 py-1 text-base font-medium text-secondary-400"
                  >
                    {matchingRoom ? matchingRoom.icon : null}
                    <span>{space}</span>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl">
            Podrobni opis
          </h3>
          <p className="text-secondary-300">{description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl">
            Tehnični podatki
          </h3>
          <ul className="grid grid-cols-2 text-secondary-300 md:grid-cols-3">
            {technicalData.map((data, index) => (
              <li className="flex gap-5" key={index}>
                <Check className="text-primary-200" />
                {data.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-3 md:gap-5">
            <h3 className="text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl">
              Lokacija
            </h3>
            <PropertyMap address={address} city={city} />
          </div>
          {files && files?.length > 0 && (
            <div className="flex flex-col items-center gap-10">
              <div className="flex max-w-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-md">
                <h4>Dokumenti</h4>
                <div className="flex items-center gap-3">
                  <DocumentIcon />
                  {files.map((file, index) => (
                    <a href={`https://utfs.io/f/${file.key}`} target="_blank" key={index}>
                      {file.name}
                    </a> // Display each file string
                  ))}
                </div>
              </div>
              <Button variant="secondary" className="w-fit">
                Vstopite v stik
              </Button>
            </div>
          )}
        </div>

        <ButtonWithIcon
          variant="primary"
          className="w-fit self-center lg:w-auto"
          icon={<KeySquare />}
          iconPosition="left"
        >
          Rezerviraj nepremičnino
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default DetailViewRealEstate
