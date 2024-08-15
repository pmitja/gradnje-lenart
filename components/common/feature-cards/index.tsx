'use client'

import CardWithIcon from '@/components/common/cards/with-icon'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import { useMediaQuery } from '@/hooks/use-media-query'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

const FeatureCards = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(8)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (isDesktop) {
    return (
      <div className='w-full gap-[120px] md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-[90px]'>
        <CardWithIcon
          icon='car'
          iconSize='80'
          title='Urejeno parkirno mesto'
          text='Uživajte v brezskrbnosti in udobju z našimi nepremičninami, kjer je  urejeno parkirno mesto ne le privilegij, ampak tudi zagotovilo vaše varnosti in enostavnosti vsakdanjega življenja.'
        />
        <CardWithIcon
          icon='energySaving'
          iconSize='75'
          title='Energijsko varčne nepremičnine'
          text='V naših nepremičninah z visokimi energetskimi standardi vam omogočamo ne le varčno rabo energije, ampak tudi prijetno in trajnostno bivalno izkušnjo.'
        />
        <CardWithIcon
          icon='markHouse'
          iconSize='70'
          title='Kakovostna gradnja'
          text='Vsak dom, ki ga predstavljamo, nosi pečat naše skrbnosti, ki se odraža v trpežnosti, estetiki in funkcionalnosti. Z odločitvijo za nas, izberete ne le nepremičnino, temveč varno in kakovostno bivalno izkušnjo.'
        />
        <CardWithIcon
          icon='mainBuilding'
          iconSize='75'
          title='Infrastruktura mesta'
          text='Naši domovi so idealno postavljeni z bližino banke, pošte, trgovin, vrtcev in šol. Uživajte v udobnem življenju, kjer je vse potrebno le kratek sprehod stran.'
        />
        <CardWithIcon
          icon='brickWall'
          iconSize='70'
          title='Inovativni sodobni materiali'
          text='Zavezani smo k ustvarjanju bivalnih prostorov, ki združujejo estetiko, trajnost in funkcionalnost. S sodobnimi materiali omogočamo visoko odpornost, energetsko učinkovitost ter nizko vzdrževanje vašega doma.'
        />
        <CardWithIcon
          icon='shield'
          iconSize='70'
          title='Varnost in brezskrbnost'
          text='Lokacije naših domov so skrbno izbrane, da preprečimo morebitne naravne nesreče, kot so poplave in potresi, hkrati pa se nahajajo v mirnih soseskah z nizko stopnjo kriminala.'
        />
      </div>
    )
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000
        })
      ]}
      setApi={setApi}
    >
      <CarouselContent>
        <CarouselItem>
          <CardWithIcon
            icon='car'
            iconSize='80'
            title='Urejeno parkirno mesto'
            text='Uživajte v brezskrbnosti in udobju z našimi nepremičninami, kjer je  urejeno parkirno mesto ne le privilegij, ampak tudi zagotovilo vaše varnosti in enostavnosti vsakdanjega življenja.'
          />
        </CarouselItem>
        <CarouselItem>
          <CardWithIcon
            icon='energySaving'
            iconSize='75'
            title='Energijsko varčne nepremičnine'
            text='V naših nepremičninah z visokimi energetskimi standardi vam omogočamo ne le varčno rabo energije, ampak tudi prijetno in trajnostno bivalno izkušnjo.'
          />
        </CarouselItem>
        <CarouselItem>
          <CardWithIcon
            icon='markHouse'
            iconSize='70'
            title='Kakovostna gradnja'
            text='Vsak dom, ki ga predstavljamo, nosi pečat naše skrbnosti, ki se odraža v trpežnosti, estetiki in funkcionalnosti. Z odločitvijo za nas, izberete ne le nepremičnino, temveč varno in kakovostno bivalno izkušnjo.'
          />
        </CarouselItem>
        <CarouselItem>
          <CardWithIcon
            icon='mainBuilding'
            iconSize='75'
            title='Infrastruktura mesta'
            text='Naši domovi so idealno postavljeni z bližino banke, pošte, trgovin, vrtcev in šol. Uživajte v udobnem življenju, kjer je vse potrebno le kratek sprehod stran.'
          />
        </CarouselItem>
        <CarouselItem>
          <CardWithIcon
            icon='brickWall'
            iconSize='70'
            title='Inovativni sodobni materiali'
            text='Zavezani smo k ustvarjanju bivalnih prostorov, ki združujejo estetiko, trajnost in funkcionalnost. S sodobnimi materiali omogočamo visoko odpornost, energetsko učinkovitost ter nizko vzdrževanje vašega doma.'
          />
        </CarouselItem>
        <CarouselItem>
          <CardWithIcon
            icon='shield'
            iconSize='70'
            title='Varnost in brezskrbnost'
            text='Lokacije naših domov so skrbno izbrane, da preprečimo morebitne naravne nesreče, kot so poplave in potresi, hkrati pa se nahajajo v mirnih soseskah z nizko stopnjo kriminala.'
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselDots className='mt-4' />
    </Carousel>
  )
}

export default FeatureCards
