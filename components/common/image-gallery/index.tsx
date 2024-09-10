'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import ArrowRightIcon from '@/components/icons/arrow-right'
import { OfferInfo } from '@/types/general'

interface ImageGalleryProps {
  images: string[]
  offerInfo: OfferInfo
}

const ImageGallery = ({ images, offerInfo }: ImageGalleryProps) => {
  useEffect(() => {
    if (images.length < 3 || images.length > 4) {
      console.error('OffersBanner component requires exactly 3 or 4 images.')
    }
  }, [ images ])

  const validImages = images.slice(0, 4)

  return (
    <div
      className={`grid min-h-[430px] ${validImages.length === 4 ? 'grid-cols-2 grid-rows-2 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl ${validImages.length === 4 && 'col-span-2 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-2'}`}
      >
        <Image
          src={validImages[0]}
          alt={'offer-image-1'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-image-gradient' />
        <div className='absolute inset-x-8 bottom-5 flex flex-col gap-2'>
          <h4 className='text-xl font-bold text-body-50 md:text-2xl'>{offerInfo.title}</h4>
          <p className='text-lg text-body-75 md:text-xl'>{offerInfo.description}</p>
          <div className='inline-flex w-fit items-center gap-2 border-b border-primary-100 text-lg md:text-xl'>
            <Link
              href={offerInfo.linkHref}
              target='_blank'
              className='text-body-75'
            >
              {offerInfo.linkLabel || 'Več o nepremičnini'}
            </Link>
            <ArrowRightIcon
              className='inline'
              fill='#f8eace'
            />
          </div>
        </div>
      </div>
      <div
        className={`relative hidden overflow-hidden rounded-2xl md:block ${validImages.length === 4 && 'col-span-2 row-span-1 md:col-span-1 md:row-span-2'}`}
      >
        <Image
          src={validImages[1]}
          alt={'offer-image-2'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
          className='object-cover'
        />
      </div>
      <div
        className={`relative hidden overflow-hidden rounded-2xl lg:block ${validImages.length === 4 && 'col-span-1 row-span-1'}`}
      >
        <Image
          src={validImages[2]}
          alt={'offer-image-3'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
          className='object-cover'
        />
      </div>
      {validImages.length === 4 && (
        <div className='relative col-span-1 row-span-1 hidden overflow-hidden rounded-2xl lg:block'>
          <Image
            src={validImages[3]}
            alt={'offer-image-4'}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
            className='object-cover'
          />
        </div>
      )}
    </div>
  )
}

export default ImageGallery
