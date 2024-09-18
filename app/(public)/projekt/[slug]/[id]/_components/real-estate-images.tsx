'use client'

import 'yet-another-react-lightbox/styles.css'

import { ThumbsUp, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    badge?: string;
  }[];
}

const RealEstateImages: React.FC<ImageGalleryProps> = ({ images }) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const [ currentImageIndex, setCurrentImageIndex ] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="relative p-0">
              <div className="relative h-48 w-full md:h-64" >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className='cursor-pointer object-cover'
                  fill
                  onClick={() => openLightbox(index)}
                />
              </div>
              {image.badge && (
                <Badge
                  className="absolute left-2 top-2 flex items-center gap-1 bg-primary-500 shadow-md"
                >
                  <ThumbsUp className="size-4" />
                  {image.badge}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images.map((img) => ({
          src: img.src,
        }))}
        index={currentImageIndex}
        styles={{
          root: {
            zIndex: 99999999,
          },
        }}
        render={{
          iconClose: () => <X className="size-6" />,
        }}
        toolbar={{
          buttons: [
            'close',
          ],
        }}
      />
    </>
  )
}

export default RealEstateImages
