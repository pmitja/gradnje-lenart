'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const Partners = () => {
  return (
    <div className="min-w-[100vw] bg-primary-75 w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <section className="container w-full flex gap-12 py-8 lg:py-[70px] overflow-hidden">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
            }),
            
          ]}>
          <CarouselContent className="-ml-1">
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 1"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 2"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 3"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 4"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 5"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 6"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 7"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 8"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/2 lg:basis-1/4">
              <Image
                src={'/gradnje-plus-logo.webp'}
                alt="Partner 9"
                width={200}
                height={80}
                className="h-7 md:h-9 lg:h-10 w-fit"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <Image
          src={'/partners-pattern.webp'}
          alt="Partner pattern"
          width={170}
          height={150}
          className="absolute right-0 bottom-0 hidden md:block md:max-h-[100px] md:max-w-[120px] lg:max-w-[180px] lg:max-h-[180px]"
        />
      </section>
    </div>
  );
};

export default Partners;
