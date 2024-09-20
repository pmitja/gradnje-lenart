import { Bath,
  Bed,
  Calendar,
  Car,
  Check,
  CookingPot,
  Euro,
  Home,
  KeySquare,
  Maximize2,
  Tv,
  Utensils,
  Zap } from 'lucide-react'
import React from 'react'

import ButtonWithIcon from '@/components/common/button-with-icon'
import DocumentIcon from '@/components/icons/document'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import PropertyMap from './property-map'
import RealEstateImages from './real-estate-images'

const images = [
  {
    src: '/stanovanje.jpg', alt: 'Living room', badge: 'Top izbira',
  },
  {
    src: '/stanovanje2.jpg', alt: 'Exterior view',
  },
  {
    src: '/stanovanje3.jpg', alt: 'Bathroom',
  },
]

interface PropertyDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailViewRealEstate = ({ description, technicalData, city, address, files }:
  { description: string, technicalData: {id: string, text: string}[],
  city: string, address: string, files?: {name: string, key: string}[] }) => {
  const details: PropertyDetail[] = [
    {
      icon: <Euro className="size-2 md:size-4 lg:size-6" />, label: 'Cena', value: '200.000 €',
    },
    {
      icon: <Maximize2 className="size-2 md:size-4 lg:size-6" />, label: 'Velikost', value: '72 m²',
    },
    {
      icon: <Calendar className="size-2 md:size-4 lg:size-6" />, label: 'Nazadnje rezervirano', value: '14.12.2024',
    },
    {
      icon: <Zap className="size-2 md:size-4 lg:size-6" />, label: 'Enegretsko varčna', value: 'Visoka raven',
    },
    {
      icon: <Car className="size-2 md:size-4 lg:size-6" />, label: 'Parkirišče', value: 'Dve parkirni mesti',
    },
  ]

  const rooms = [
    {
      icon: <Home className="size-2 md:size-4 lg:size-6" />, label: 'Hodnik',
    },
    {
      icon: <Bath className="size-2 md:size-4 lg:size-6" />, label: 'Kopalnica',
    },
    {
      icon: <Bath className="size-2 md:size-4 lg:size-6" />, label: 'Wc',
    },
    {
      icon: <Bed className="size-2 md:size-4 lg:size-6" />, label: 'Spalnica',
    },
    {
      icon: <Home className="size-2 md:size-4 lg:size-6" />, label: 'Soba',
    },
    {
      icon: <CookingPot className="size-2 md:size-4 lg:size-6" />, label: 'Kuhinja',
    },
    {
      icon: <Utensils className="size-2 md:size-4 lg:size-6" />, label: 'Jedilnica',
    },
    {
      icon: <Tv className="size-2 md:size-4 lg:size-6" />, label: 'Dnevna soba',
    },
  ]

  return (
    <div className="mt-8 space-y-6 lg:mt-14 lg:space-y-10">
      <RealEstateImages images={images} />
      <h2 className='text-xl font-bold leading-none tracking-tight text-secondary-400 lg:text-3xl'>
      Podrobni podatki o nepremični
    </h2>
      <Card className='rounded-[32px] border border-secondary-75 bg-primary-50'>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-wrap gap-4">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center gap-3 border-r border-secondary-100 pr-5 lg:gap-5 lg:pr-10">
                {detail.icon}
                <div className='flex flex-col items-start gap-1 lg:gap-2'>
                <span className="text-sm text-gray-500">{detail.label}</span>
                <span className="font-medium text-primary-300">{detail.value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-semibold leading-none tracking-tight text-secondary-400 lg:text-2xl'>Prostori</h3>
        <div className="flex flex-wrap gap-2">
          {rooms.map((room, index) => (
            <Badge key={index} variant="heroPills" className="flex items-center gap-2.5 px-2 py-1 text-base font-medium text-secondary-400">
              {room.icon}
              <span>{room.label}</span>
            </Badge>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl'>Podrobni opis</h3>
        <p className='text-secondary-300'>
          {description}
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl'>Tehnični podatki</h3>
        <ul className='grid grid-cols-2 text-secondary-300 md:grid-cols-3'>
          {technicalData.map((data, index) => (
            <li className='flex gap-5' key={index}><Check className='text-primary-200' />{data.text}</li>
          ))}
        </ul>
      </div>

      <div className='grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-10'>
        <div className='flex flex-col gap-3 md:gap-5'>
          <h3 className='text-xl font-semibold leading-none tracking-tight text-secondary-400 lg:text-3xl'>Lokacija</h3>
          <PropertyMap address={address} city={city} />
        </div>
        {files && <div className='flex flex-col items-center gap-10'>
          <div className='flex max-w-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-md'>
            <h4>Dokumenti</h4>
            <div className='flex items-center gap-3'>
              <DocumentIcon />
              {files.map((file, index) => (
                <a href={`https://utfs.io/f/${file.key}`} target='_blank' key={index}>{file.name}</a> // Display each file string
              ))}
            </div>
          </div>
            <Button variant="secondary" className='w-fit'>Vstopite v stik</Button>
        </div>}
      </div>

      <ButtonWithIcon variant="primary" className="w-full lg:w-auto" icon={<KeySquare />} iconPosition='left'>Rezerviraj nepremičnino</ButtonWithIcon>
    </div>
  )
}

export default DetailViewRealEstate
