import { Metadata } from 'next'

import Hero from '@/components/common/hero'
import PartnersBanner from '@/components/common/partners-banner'
import WhyChooseUs from '@/components/common/why-choose-us'
import Faq from '@/components/layouts/sections/faq'
import PropertyListingSection from '@/components/layouts/sections/property-listing-section'

// Prepare both JSON-LD schemas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gradnje Lenart',
  url: 'https://gradnje-lenart.si',
  logo: 'https://gradnje-lenart.si/gradnje-plus-logo-card.webp',
  description: 'Gradnje Lenart je vodilno podjetje za gradnjo in prodajo nepremičnin v Slovenskih goricah.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Partizanska cesta 14',
    addressLocality: 'Lenart v Slovenskih goricah',
    postalCode: '2230',
    addressCountry: 'SI',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+386 41 638 451',
    email: 'info@gradnje-lenart.si',
    contactType: 'customer service',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ],
      opens: '08:00',
      closes: '16:00',
    },
  },
  sameAs: [
    'https://facebook.com',
    'https://instagram.com',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Gradnje Lenart',
  url: 'https://gradnje-lenart.si',
  description: 'Uradna spletna stran podjetja Gradnje Lenart - vodilnega podjetja za gradnjo in prodajo nepremičnin v Slovenskih goricah.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://gradnje-lenart.si/projekti/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// Combine both schemas in an array
const structuredData = [ organizationSchema, websiteSchema ]

export const metadata: Metadata = {
  title: 'Gradnje Lenart | Gradnja in prodaja nepremičnin',
  description: 'Gradnje Lenart je vodilno podjetje za gradnjo in prodajo nepremičnin v Slovenskih goricah. Oglejte si našo ponudbo stanovanj, hiš in poslovnih prostorov.',
  openGraph: {
    title: 'Gradnje Lenart | Gradnja in prodaja nepremičnin',
    description: 'Odkrijte kakovostne nepremičnine na najboljših lokacijah. Stanovanja, hiše in poslovni prostori po vaši meri.',
    images: [ '/page-hero.webp' ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://gradnje-lenart.si',
  },
  other: {
    'structured-data': JSON.stringify(structuredData),
  },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <PropertyListingSection />
      <PartnersBanner />
      <WhyChooseUs />
      <Faq />
    </div>
  )
}
