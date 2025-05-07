'use client'

import 'yet-another-react-lightbox/styles.css'

import { Camera, Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import { Button } from '@/components/ui/button'

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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-400">
            Fotografije ({images.length})
          </h2>
          {images.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm font-medium text-primary-300 hover:text-primary-400"
              onClick={() => openLightbox(0)}
            >
              <Camera className="size-4" />
              Ogled vseh slik
            </Button>
          )}
        </div>

        {/* Horizontally scrollable thumbnail gallery */}
        <div className="scrollbar-thin scrollbar-thumb-primary-100 flex gap-3 overflow-x-auto pb-2" style={{
          height: 120,
        }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative shrink-0 cursor-pointer overflow-hidden rounded-lg border border-secondary-100 shadow-sm"
              style={{
                width: 160, height: 110,
              }}
              tabIndex={0}
              aria-label={`Poglej sliko ${index + 1}`}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index) }}
            >
              <Image
                src={`https://utfs.io/f/${image}`}
                alt={`Real estate image ${index + 1}`}
                fill
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="160px"
                quality={80}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/20">
                <ImageIcon className="size-6 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
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
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
        render={{
          iconClose: () => <X className="size-6" />,
        }}
        carousel={{
          finite: false,
          preload: 3,
          padding: '16px',
          spacing: '30px',
          imageFit: 'contain',
        }}
        animation={{
          swipe: 300,
        }}
        controller={{
          closeOnBackdropClick: true,
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
