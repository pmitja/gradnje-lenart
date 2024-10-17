'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const PartnersBanner = () => (
    <div className='relative inset-x-1/2 mx-[-50vw] my-6 w-screen min-w-[100vw] bg-primary-75 md:my-10'>
      <section className='container flex w-full gap-12 overflow-hidden py-8 lg:py-[70px]'>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          opts={{
            align: 'center',
            loop: true,
          }}
        >
          <CarouselContent className='-ml-2 md:-ml-4'>
            {Array.from({
              length: 9,
            }).map((_, index) => (
              <CarouselItem key={index} className='basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5'>
                <div className="flex h-full items-center justify-center">
                  <Image
                    src={'/gradnje-plus-logo.webp'}
                    alt={`Partner ${index + 1}`}
                    width={200}
                    height={80}
                    className='h-7 w-auto md:h-9 lg:h-10'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Image
          src={'/partners-pattern.webp'}
          alt='Partner pattern'
          width={170}
          height={150}
          className='absolute bottom-0 right-0 hidden md:block md:max-h-[100px] md:max-w-[120px] lg:max-h-[180px] lg:max-w-[180px]'
        />
      </section>
    </div>
)

export default PartnersBanner
