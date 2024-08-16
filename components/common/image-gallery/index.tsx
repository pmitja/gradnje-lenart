'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  useEffect(() => {
    if (images.length < 3 || images.length > 4) {
      console.error('OffersBanner component requires exactly 3 or 4 images.')
    }
  }, [images])

  const validImages = images.slice(0, 4)

  return (
    <>
      {validImages.length <= 3 && (
        <div className='grid min-h-[430px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='relative overflow-hidden rounded-2xl'>
            <Image
              src={validImages[0]}
              alt={'offer-image-1'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
          <div className='relative hidden overflow-hidden rounded-2xl md:block'>
            <Image
              src={validImages[1]}
              alt={'offer-image-2'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
          <div className='relative hidden overflow-hidden rounded-2xl lg:block'>
            <Image
              src={validImages[2]}
              alt={'offer-image-3'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
        </div>
      )}
      {validImages.length === 4 && (
        <div className='grid min-h-[430px] grid-cols-2 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4'>
          <div className='relative col-span-2 row-span-2 overflow-hidden rounded-2xl md:col-span-1 md:row-span-2 lg:col-span-2'>
            <Image
              src={validImages[0]}
              alt={'offer-image-1'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
          <div className='relative col-span-2 row-span-1 hidden overflow-hidden rounded-2xl md:col-span-1 md:row-span-2 md:block'>
            <Image
              src={validImages[1]}
              alt={'offer-image-2'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
          <div className='relative col-span-1 row-span-1 hidden overflow-hidden rounded-2xl lg:block'>
            <Image
              src={validImages[2]}
              alt={'offer-image-3'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
          <div className='relative col-span-1 row-span-1 hidden overflow-hidden rounded-2xl lg:block'>
            <Image
              src={validImages[3]}
              alt={'offer-image-4'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
              className='object-cover'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
