import { Metadata } from 'next'

import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import { getRealEstateById } from '@/actions/get-real-estate-by-id'
import RealEstateHero from '@/components/common/hero/real-estate-hero'
import ProjectsCta from '@/components/common/projects-cta'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import { LocationType, SpacesType } from '@/types/general'

import DetailViewRealEstate from './_components/detail-view-real-estate'

interface MetadataProps {
  params: { slug: string; id: string }
}

interface PageProps {
  params: Promise<{ slug: string; id: string }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const location = await getLocationRealEstates(params.slug.toString())

  const realEstate = await getRealEstateById(params.id.toString())

  if (!realEstate || !location) {
    return {
      title: 'Nepremičnina ni najdena | Gradnje Plus',
      description: 'Iskana nepremičnina ni bila najdena.',
    }
  }

  // Create appropriate description based on available data
  const locationInfo = `${location.city}, ${location.address}`

  const sizeInfo = realEstate.size ? `${realEstate.size} m²` : ''

  const description = `${realEstate.name} - ${locationInfo}${sizeInfo ? ` - ${sizeInfo}` : ''}. ${
    realEstate.description?.substring(0, 100) || ''
  }${realEstate.description && realEstate.description.length > 100 ? '...' : ''}`

  // Determine property type based on location.type
  let propertyType = 'Apartment'

  if (location.type === 'house') {
    propertyType = 'House'
  } else if (location.type === 'building') {
    propertyType = 'ApartmentComplex'
  }

  // Map status to availability
  const availability = realEstate.status === 'available' ? 'InStock' : 'SoldOut'

  // Format dates for ISO compatibility (if they exist)
  const createdAt = realEstate.createdAt ? new Date(realEstate.createdAt).toISOString() : undefined

  const updatedAt = realEstate.updatedAt ? new Date(realEstate.updatedAt).toISOString() : undefined

  // Build a clean JSON-LD object without null or undefined values
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    url: `https://gradnje-lenart.si/projekt/${params.slug}/${params.id}`,
    name: realEstate.name,
    description: realEstate.description || description,
  }

  // Add dates only if they exist
  if (createdAt) {
    jsonLd.datePosted = createdAt
  }

  if (updatedAt) {
    jsonLd.dateModified = updatedAt
  }

  // Add images if they exist
  if (realEstate.images?.length) {
    jsonLd.image = realEstate.images.map((img) => `https://utfs.io/f/${img}`)
  }

  // Add price information if it exists
  if (realEstate.priceWithTax) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: realEstate.priceWithTax,
      priceCurrency: 'EUR',
      availability: `https://schema.org/${availability}`,
    }

    // Add validity dates if available
    if (createdAt) {
      jsonLd.offers.validFrom = createdAt
    }
  }

  // Add location information
  jsonLd.contentLocation = {
    '@type': 'Place',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      streetAddress: location.address,
      addressCountry: 'SI',
    },
  }

  // Add property details
  const additionalProperties = []

  if (realEstate.size) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'floorSize',
      value: realEstate.size,
      unitText: 'm²',
    })
  }

  if (realEstate.parkingSpaces) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'parkingSpaces',
      value: realEstate.parkingSpaces,
    })
  }

  if (realEstate.energyLevel) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'energyEfficiencyRating',
      value: realEstate.energyLevel,
    })
  }

  if (additionalProperties.length > 0) {
    jsonLd.additionalProperty = additionalProperties
  }

  // Add main entity
  jsonLd.mainEntityOfPage = {
    '@type': 'WebPage',
    '@id': `https://gradnje-lenart.si/projekt/${params.slug}/${params.id}`,
  }

  // Add provider
  jsonLd.provider = {
    '@type': 'Organization',
    name: 'Gradnje Plus',
    url: 'https://gradnje-lenart.si',
  }

  // Add property type
  jsonLd.about = {
    '@type': propertyType,
  }

  return {
    title: `${realEstate.name} | ${location.name} | Gradnje Plus`,
    description,
    openGraph: {
      title: `${realEstate.name} | ${location.name}`,
      description,
      images: realEstate.images?.length ? [ `https://utfs.io/f/${realEstate.images[0]}` ] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://gradnje-lenart.si/projekt/${params.slug}/${params.id}`,
    },
    // JSON-LD structured data
    other: {
      'structured-data': JSON.stringify(jsonLd),
    },
  }
}

const SingleProjectPage = async ({ params }: PageProps) => {
  const resolvedParams = await params

  const location = await getLocationRealEstates(resolvedParams.slug.toString())

  const realEstates = await getRealEstateById(resolvedParams.id.toString())

  if (!realEstates || !location) {
    return null
  }

  return (
    <div className="min-h-screen bg-body-50">
      <RealEstateHero
        id={resolvedParams.id}
        title={realEstates.name}
        address={`${location.city}, ${location.address}`}
        size={realEstates.size?.toString() || '0'}
        parkingSpaces={realEstates.parkingSpaces ?? 0}
        status={realEstates.status}
      />

      <div className="mx-auto max-w-container px-4 py-8 sm:px-6 lg:py-12">
        <DetailViewRealEstate
          id={resolvedParams.id}
          description={realEstates.description ?? ''}
          technicalData={realEstates.technicalData as { id: string; text: string }[]}
          address={location.address}
          city={location.city}
          files={realEstates.files as { name: string; key: string }[]}
          spaces={realEstates.spaces as SpacesType[]}
          status={realEstates.status}
          price={realEstates.priceWithTax}
          lastTimeReserved={realEstates.updatedAt}
          energyLevel={realEstates.energyLevel}
          parkingSpaces={realEstates.parkingSpaces}
          size={realEstates.size}
          images={realEstates.images}
          type={location.type as LocationType}
        />

        <div className="mt-10 space-y-10 lg:mt-16 lg:space-y-16">
          <ProjectsCta />
          <OffersBanner />
        </div>
      </div>
    </div>
  )
}

export default SingleProjectPage
