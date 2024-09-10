'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Quote } from 'lucide-react'
import Image from 'next/image'

import ButtonWithIcon from '@/components/common/button-with-icon'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const Testimonials = () => (
    <>
      <section className='grid grid-cols-1 justify-between gap-8 lg:grid-cols-2'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-4xl font-bold leading-[120%] text-primary-200 md:text-[51px] md:leading-[57px] lg:leading-[76.5px]'>
            Izjave zadovoljih strank
          </h2>

          <p className='font-archivo text-base leading-5 text-secondary-200'>
            Pri nas se trudimo, da vsaka stranka dobi najboljšo možno izkušnjo. Tukaj je nekaj izjav
            naših zadovoljnih strank, ki so z nami delile svoje pozitivne izkušnje.
          </p>
          <ButtonWithIcon
            variant={'secondary'}
            className='w-fit'
          >
            Kontaktirajte nas
          </ButtonWithIcon>
        </div>
        <Carousel
          className='relative inset-x-1/2 col-span-2 row-start-2 mx-[-50vw] flex w-screen min-w-[100vw] flex-row flex-wrap gap-6 md:inset-x-auto md:mx-auto md:w-full md:min-w-[auto]'
          opts={{
            align: 'start',
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
            <CarouselItem className='shadow-sm lg:basis-1/2'>
              <div className='flex flex-wrap items-center justify-between gap-8 rounded-lg bg-body-200 p-8'>
                <div className='flex flex-col gap-4'>
                  <Quote className='text-primary-400' />
                  <p className='font-semibold text-secondary-300'>
                    S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega stanovanja v
                    vašem preteklem projektu. Od začetka do konca sem bil impresioniran z vašim
                    profesionalnim pristopom in predanostjo kakovosti. Stanovanje presega vsa moja
                    pričakovanja - od sodobne zasnove do kakovostnih materialov. Poleg tega, da je
                    dom izjemno udoben, sem še posebej hvaležen za varno in urejeno okolico ter
                    bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega bivalnega
                    prostora, ki ga sedaj z veseljem imenujem svoj dom.
                  </p>
                  <span className='text-xs leading-[14px] text-primary-200'>Boštjan Novak</span>
                </div>
                <Image
                  src='/testimonials.webp'
                  alt='Testimonials'
                  width={100}
                  height={100}
                  className='mb-2 max-h-[100px] max-w-[100px] rounded-full drop-shadow-lg'
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>
      {/* <div className="flex flex-col gap-3 place-items-center">
        <Image
          src="/testimonials.webp"
          alt="Testimonials"
          width={70}
          height={70}
          className="mb-2 rounded-full drop-shadow-lg"
        />
        <h3 className="font-archivo italic text-lg leading-7 text-primary-200 font-bold">
          Vredni so zaupanja!
        </h3>
        <p className="font-archivo text-base leading-5 text-secondary-200 text-center">
          S ponosom delim svoje izjemno zadovoljstvo z nakupom 2-sobnega
          stanovanja v vašem preteklem projektu. Od začetka do konca sem bil
          impresioniran z vašim profesionalnim pristopom in predanostjo
          kakovosti. Stanovanje presega vsa moja pričakovanja - od sodobne
          zasnove do kakovostnih materialov. Poleg tega, da je dom izjemno
          udoben, sem še posebej hvaležen za varno in urejeno okolico ter
          bližino ključnih storitev. Hvala vam za ustvarjanje tako prijetnega
          bivalnega prostora, ki ga sedaj z veseljem imenujem svoj dom.
        </p>
        <span className="text-xs leading-[14px] text-secondary-75">
          Boštjan Novak
        </span>
        <div className="avatar-group -space-x-4 rtl:space-x-reverse">
          <div className="avatar border-primary-200 drop-shadow-lg">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="avatar border-primary-200 drop-shadow-lg">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="avatar border-primary-200 drop-shadow-lg">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="avatar border-primary-200 drop-shadow-lg">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="avatar placeholder border-primary-200 drop-shadow-lg">
            <div className="w-12 bg-primary-75 text-secondary-200">
              <span>+99</span>
            </div>
          </div>
        </div>
      </div> */}
    </>
)

export default Testimonials
