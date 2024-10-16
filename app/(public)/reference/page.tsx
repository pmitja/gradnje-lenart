import { Metadata } from 'next'
import React from 'react'

import { getInactiveLocations } from '@/actions/get-inactive-locations'
import ContactUs from '@/components/common/contact-us'
import Cta from '@/components/common/cta'
import ReferenceHero from '@/components/common/reference-hero'
import OffersBanner from '@/components/layouts/sections/offers-banner'

export const metadata: Metadata = {
  title: 'Reference | Gradnje Plus',
  description: 'Poglejte si reference naših projektov.',
}

const ReferencePage = async () => {
  const inactiveLocations = await getInactiveLocations()

  return (
    <div>
      <ReferenceHero projects={inactiveLocations} />
      <section className="py-6">
        <OffersBanner />
      </section>
      <section className="py-6">
        <Cta />
      </section>
      <section className="py-6 lg:py-12">
        <ContactUs />
      </section>
    </div>
  )
}

export default ReferencePage
