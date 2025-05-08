import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import ContactUs from '@/components/common/contact-us'
import ProjectsCta from '@/components/common/projects-cta'
import GradnjeIcon from '@/components/icons/gradnje-icon'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ShadowBanner from '@/components/ui/shadow-banner'

export const metadata: Metadata = {
  title: 'Kontakt | Vaše Podjetje',
  description: 'Stopite v stik z nami za vse vaše nepremičninske potrebe.',
}

const KontaktPage = () => (
  <div>
    <ShadowBanner
      backgroundImagePath="/about-hero-image.webp"
      heading="Gradnje Plus"
      icon={<GradnjeIcon className="h-14 w-14 md:h-20 md:w-24 fill-primary-200" />}
    />
    <section className="relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-primary-75">
      <div className="container flex w-full justify-between gap-4 overflow-hidden py-8 lg:py-[70px]">
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 1"
          width={150}
          height={100}
          className="size-auto object-contain"
        />
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 2"
          width={150}
          height={100}
          className="size-auto object-contain"
        />
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 3"
          width={150}
          height={100}
          className="hidden size-auto object-contain md:block"
        />
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 4"
          width={150}
          height={100}
          className="hidden size-auto object-contain md:block"
        />
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 5"
          width={150}
          height={100}
          className="hidden size-auto object-contain lg:block"
        />
        <Image
          src={'/gradnje-plus-logo.webp'}
          alt="Partner 6"
          width={150}
          height={100}
          className="hidden size-auto object-contain lg:block"
        />
        <Image
          src={'/partners-pattern.webp'}
          alt="Partner pattern"
          width={170}
          height={150}
          className="absolute bottom-0 right-0 hidden md:block md:max-h-[100px] md:max-w-[120px] lg:max-h-[180px] lg:max-w-[180px]"
        />
      </div>
    </section>
    <section className="py-6 lg:py-12">
      <ContactUs />
    </section>
    <ProjectsCta />
    <OffersBanner />
  </div>
)

export default KontaktPage
