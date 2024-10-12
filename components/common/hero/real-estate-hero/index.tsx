import { BadgeCheckIcon, Car, Expand, Home, MapPin, ParkingSquare, Share2 } from 'lucide-react'

import ReservationDialog from '@/app/(public)/projekt/[slug]/[id]/_components/ReservationDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const RealEstateHero = ({
  id,
  title,
  address,
  size,
  parkingSpaces = 0,
  status,
}: {
  id: string
  title: string
  address: string
  size: string
  parkingSpaces?: number
  status?: string | null
}) => (
  <div className="relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover pt-10 md:pt-16 lg:pt-0">
    <div className="container relative flex w-full flex-col items-center justify-center gap-8 pb-8 lg:w-full lg:grid-cols-2 lg:gap-5 lg:pb-28 lg:pt-20">
      <Badge>
        <Home size={20} />
        Nepremičnina
      </Badge>
      <h2 className="text-center text-4xl font-bold leading-[120%] md:text-[51px] md:leading-[57px] lg:mt-2 lg:max-w-[75%] lg:text-[67px] lg:leading-[100.5px]">
        {title}
      </h2>
      <p className="flex flex-wrap items-center gap-2 text-center font-archivo text-lg leading-6 text-secondary-200 lg:max-w-[60%] lg:text-xl lg:leading-8">
        <MapPin />
        {address}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={'heroPills'}
          className="place-content-center text-xs font-bold text-secondary-400"
        >
          <Expand size={16} />
          <span>{size} m²</span>
        </Badge>
        {parkingSpaces > 0 && (
          <Badge
            variant={'heroPills'}
            className="place-content-center text-xs font-bold text-secondary-400"
          >
            <ParkingSquare />
            <span>Parkirišče</span>
          </Badge>
        )}
        {parkingSpaces > 0 && (
          <Badge
            variant={'heroPills'}
            className="place-content-center text-xs font-bold text-secondary-400"
          >
            <Car />
            <span>{parkingSpaces}</span>
          </Badge>
        )}
      </div>
      {status !== 'Prodano' && status !== 'Rezervirano' && (
        <ReservationDialog realEstateId={id}>
          <Button variant={'primary'} className="flex gap-3">
            <BadgeCheckIcon />
            Rezerviraj
          </Button>
        </ReservationDialog>
      )}
      <Button variant={'secondary'} className="flex gap-3">
        <Share2 />
      </Button>
    </div>
  </div>
)

export default RealEstateHero
