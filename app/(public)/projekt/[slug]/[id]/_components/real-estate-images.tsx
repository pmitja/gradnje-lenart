'use client'

import 'yet-another-react-lightbox/styles.css'

import { ThumbsUp, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[];
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
      <div className={cn(
        'grid gap-4',
        images.length === 1 && 'grid-cols-1',
        images.length >= 2 && 'grid-cols-2 md:grid-cols-3',
      )}>
        {images.slice(0, 3).map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="relative p-0">
              <div className="relative h-48 w-full md:h-64" >
                <Image
                  src={`https://utfs.io/f/${image}`}
                  alt={image}
                  className='cursor-pointer object-cover'
                  fill
                  onClick={() => openLightbox(index)}
                />
              </div>
              {index === 1 && (
                <Badge
                  className="absolute left-2 top-2 flex items-center gap-1 bg-primary-500 shadow-md"
                >
                  <ThumbsUp className="size-4" />
                  Top izbira
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
          src: `https://utfs.io/f/${img}`,
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
