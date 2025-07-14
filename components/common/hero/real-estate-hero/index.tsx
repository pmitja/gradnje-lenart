'use client'

import { BadgeCheckIcon, Car, Check, Expand, Home, Linkedin, MapPin, ParkingSquare, Share2 } from 'lucide-react'
import { useState } from 'react'

import ReservationDialog from '@/app/(public)/projekt/[slug]/[id]/_components/ReservationDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from '@/components/ui/dialog'

const ShareDialog = ({ url, title }: { url: string; title: string }) => {
  const [ copied, setCopied ] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <DialogContent className="max-w-sm border-primary-100 bg-white">
      <DialogHeader>
        <DialogTitle className="text-center text-secondary-300">Deli nepremičnino</DialogTitle>
      </DialogHeader>
      <div className="mt-2 flex flex-col gap-3 py-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-3 rounded-lg bg-body-50 px-5 py-3 text-secondary-300 transition hover:bg-pink-50"
        >
          {copied ? (
            <>
              <Check className="size-6 text-success-300" />
              <span className="font-medium text-success-300">Povezava kopirana!</span>
            </>
          ) : (
            <>
              <Share2 className="size-6 text-pink-500" />
              <span className="font-medium">Kopiraj povezavo</span>
            </>
          )}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`Nepremičnina: ${title}`)}&summary=${encodeURIComponent(`Oglejte si to nepremičnino: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg bg-body-50 px-5 py-3 text-secondary-300 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <Linkedin className="size-6 text-blue-700" />
          <span className="font-medium">Deli na LinkedIn</span>
        </a>
      </div>
      <DialogClose asChild>
        <button className="mt-4 w-full rounded-lg bg-primary-100 py-3 text-sm font-medium text-white transition hover:bg-primary-200">Zapri</button>
      </DialogClose>
    </DialogContent>
  )
}

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
  <div className="relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:bg-black/30 after:content-['']">
    <div className="container relative z-10 mx-auto flex min-h-[35vh] w-full flex-col items-center justify-center gap-4 pb-8 pt-16 text-white md:min-h-[40vh] md:pb-12 md:pt-20 lg:min-h-[45vh] lg:gap-5 lg:pb-16 lg:pt-24">
      <Badge className="animate-fade-in-down bg-primary-300/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-primary-300">
        <Home className="mr-2 size-4" />
        Nepremičnina
      </Badge>

      <h1 className="animate-fade-in-up text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:max-w-4xl lg:text-5xl lg:leading-tight">
        {title}
      </h1>

      <div className="animate-fade-in-up flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-center font-medium backdrop-blur-sm">
        <MapPin className="size-5 text-primary-100" />
        <span className="text-lg">{address}</span>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Badge
          variant="heroPills"
          className="animate-fade-in-up flex h-10 items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
        >
          <Expand className="size-5 text-primary-100" />
          <span>{size} m²</span>
        </Badge>

        {parkingSpaces > 0 && (
          <Badge
            variant="heroPills"
            className="animate-fade-in-up flex h-10 items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
          >
            <ParkingSquare className="size-5 text-primary-100" />
            <span>Parkirišče</span>
          </Badge>
        )}

        {parkingSpaces > 0 && (
          <Badge
            variant="heroPills"
            className="animate-fade-in-up flex h-10 items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
          >
            <Car className="size-5 text-primary-100" />
            <span>{parkingSpaces}</span>
          </Badge>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {status !== 'Prodano' && status !== 'Rezervirano' && (
          <ReservationDialog realEstateId={id}>
            <Button
              variant="primary"
              className="animate-fade-in-up flex h-12 items-center gap-3 rounded-full px-8 text-base font-medium shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <BadgeCheckIcon className="size-5" />
              Rezerviraj
            </Button>
          </ReservationDialog>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="animate-fade-in-up flex size-12 items-center justify-center rounded-full bg-white/15 p-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
              aria-label="Deli nepremičnino"
            >
              <Share2 className="size-5" />
            </Button>
          </DialogTrigger>
          <ShareDialog
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={title}
          />
        </Dialog>
      </div>
    </div>
  </div>
)

export default RealEstateHero
