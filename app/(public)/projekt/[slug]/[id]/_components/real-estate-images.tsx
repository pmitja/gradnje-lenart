import { ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    badge?: string;
  }[];
}

const RealEstateImages: React.FC<ImageGalleryProps> = ({ images }) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="relative p-0">
            <div className="relative h-48 w-full md:h-64" >
            <Image
              src={image.src}
              alt={image.alt}
              className='object-cover'
              fill
            />
            </div>
            {image.badge && (
              <Badge
                className="absolute left-2 top-2 flex items-center gap-1  bg-primary-500 shadow-md"
              >
                <ThumbsUp className="size-4" />
                {image.badge}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
)

export default RealEstateImages
