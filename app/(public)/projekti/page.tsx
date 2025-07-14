import { Metadata } from 'next'

import ProjectFilterHeroClientWrapper from '@/components/common/hero/project-filter-hero/client-wrapper'
import ProccesOfBuying from '@/components/common/procces-of-buying'
import Faq from '@/components/layouts/sections/faq'
import LocationsSection from '@/components/layouts/sections/locations-section'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import PropertyListingSection from '@/components/layouts/sections/property-listing-section'
import React from 'react'

export const metadata: Metadata = {
  title: 'Naši Projekti | Gradnje Plus',
  description: 'Odkrijte naše aktualne projekte in nepremičnine - hiše, stanovanja in večstanovanjske objekte na različnih lokacijah.',
}

const ActualProjectPage = () => (
  <div className="min-h-screen">
    <ProjectFilterHeroClientWrapper />
    <LocationsSection />
    <PropertyListingSection id="property-listing-section" />
    <ProccesOfBuying />
    <OffersBanner />
    <Faq />
  </div>
)

export default ActualProjectPage
