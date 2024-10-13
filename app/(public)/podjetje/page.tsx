import Image from 'next/image'

import ContactUs from '@/components/common/contact-us'
import Cta from '@/components/common/cta'
import PartnersCards from '@/components/common/partners-cards'
import { StatType } from '@/components/common/stat'
import Stats from '@/components/common/stats'
import GradnjeIcon from '@/components/icons/gradnje-icon'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ShadowBanner from '@/components/ui/shadow-banner'

const stats: StatType[] = [
  {
    subtitle: 'nepremičnin zgrajenih',
    endValue: 100,
  },
  {
    subtitle: 'zadovoljnih strank',
    endValue: 1200,
  },
  {
    subtitle: 'zadovoljstva',
    endValue: 99,
    isPercentage: true,
  },
]

const About = () => (
  <div>
    <ShadowBanner
      backgroundImagePath="/about-hero-image.webp"
      heading="Gradnje Plus"
      icon={<GradnjeIcon className="h-20 w-24 fill-primary-200" />}
      subheading="Nepremičnine niso zgolj nakup. So nepogrešljiv del vsakega izmed nas."
    />
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-primary-75'>
      <section className='container flex w-full justify-between gap-4 overflow-hidden py-8 lg:py-[70px]'>
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 1'
            width={150}
            height={100}
            className='size-auto object-contain'
          />
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 2'
            width={150}
            height={100}
            className='size-auto object-contain'
          />
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 3'
            width={150}
            height={100}
            className='hidden size-auto object-contain md:block'
          />
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 4'
            width={150}
            height={100}
            className='hidden size-auto object-contain md:block'
          />
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 5'
            width={150}
            height={100}
            className='hidden size-auto object-contain lg:block'
          />
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt='Partner 6'
            width={150}
            height={100}
            className='hidden size-auto object-contain lg:block'
          />
        <Image
          src={'/partners-pattern.webp'}
          alt='Partner pattern'
          width={170}
          height={150}
          className='absolute bottom-0 right-0 hidden md:block md:max-h-[100px] md:max-w-[120px] lg:max-h-[180px] lg:max-w-[180px]'
        />
      </section>
    </div>
    <section className="flex flex-col gap-4 py-6">
      <p className="text-2xl font-bold text-secondary-400 md:text-3xl">
        Nasledstvo, ki ustvarja sanje.
      </p>
      <p className="text-lg text-secondary-200 md:text-xl">
        Specializirano podjetje za nepremičnine ponuja celovite storitve, vključno z iskanjem,
        prodajo, oddajo in upravljanjem nepremičnin. Z izkušenimi agenti in strokovnim znanjem na
        trgu nepremičnin strankam nudijo zanesljivo podporo pri njihovih nepremičninskih potrebah,
        vključno s svetovanjem o naložbah ter upravljanjem nepremičninskih portfeljev. Zavezani so k
        ustvarjanju uspešnih in zadovoljnih strank.
      </p>
    </section>
    <section className="flex flex-col gap-4 py-6">
      <p className="text-2xl font-bold text-secondary-400 md:text-3xl">Naša zgodba</p>
      <div className="pb-3">
        <Stats stats={stats} />
      </div>
      <div className="relative aspect-[1354/942] w-full">
        <Image src="/Timeline.webp" alt="Timeline" fill className="object-cover" />
      </div>
    </section>
    <section className="flex flex-col gap-4 py-6">
      <p className="text-2xl font-bold text-secondary-400 md:text-3xl">Partnerji</p>
      <PartnersCards />
    </section>
    <section className="py-6">
      <Cta />
    </section>
    <section className="py-6">
      <OffersBanner />
    </section>
    <section className="py-6 lg:py-12">
      <ContactUs />
    </section>
  </div>
)

export default About
