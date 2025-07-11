import { Metadata } from 'next'

import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import InnerHero from '@/components/common/hero/inner-hero'
import ProjectsCta from '@/components/common/projects-cta'
import RealEstateTable from '@/components/common/real-estate-table'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import RealEstateListing from '@/components/layouts/sections/single-project'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  
  const slug = resolvedParams.slug.toString()

  const location = await getLocationRealEstates(slug)

  if (!location) {
    return {
      title: 'Projekt ni najden | Gradnje Plus',
      description: 'Iskani projekt ni bil najden.',
    }
  }

  // Count properties by status
  const availableProperties = location.realEstates.filter((re) => re.status === 'available').length

  // Create a valid JSON-LD structure without null values
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    description: location.description || `Nepremičninski projekt na lokaciji ${location.city}, ${location.address}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      streetAddress: location.address,
      addressCountry: 'SI',
    },
  }

  // Only add images if they exist
  if (location.images?.length) {
    jsonLd.image = `https://utfs.io/f/${location.images[0]}`
  }

  // Add URL
  jsonLd.url = `https://gradnje-lenart.si/projekt/${slug}`

  // Add real estate data
  if (location.realEstates.length > 0) {
    jsonLd.subOrganization = {
      '@type': 'Organization',
      name: `${location.name} Development`,
      description: `Residential development with ${location.realEstates.length} properties`,
    }

    // Add availability data
    if (availableProperties > 0) {
      jsonLd.subOrganization.offers = {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        availabilityStarts: location.createdAt,
        itemOffered: {
          '@type': 'Accommodation',
          name: `Properties at ${location.name}`,
          numberOfRooms: {
            '@type': 'QuantitativeValue',
            value: availableProperties,
          },
        },
      }
    }
  }

  // Add provider
  jsonLd.provider = {
    '@type': 'Organization',
    name: 'Gradnje Plus',
    url: 'https://gradnje-lenart.si',
  }

  return {
    title: `${location.name} | Gradnje Plus`,
    description: location.description || `Preglejte podrobnosti nepremičninskega projekta ${location.name} na lokaciji ${location.city}, ${location.address}.`,
    openGraph: {
      title: `${location.name} | Gradnje Plus`,
      description: location.description || `Nepremičninski projekt ${location.name} na lokaciji ${location.city}.`,
      images: location.images?.length ? [ `https://utfs.io/f/${location.images[0]}` ] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://gradnje-lenart.si/projekt/${slug}`,
    },
    // JSON-LD structured data
    other: {
      'structured-data': JSON.stringify(jsonLd),
    },
  }
}

const SelectedProject = async ({ params }: { params: { slug: string } }) => {
  // First await the params object
  const awaitedParams = await params

  const slug = awaitedParams.slug.toString()

  const location = await getLocationRealEstates(slug)

  if (!location) {
    return null
  }

  return (
    <div>
      <InnerHero title={location.name} />
      <div className='mt-5 flex flex-col gap-5 lg:mt-10 lg:gap-10'>
      <RealEstateTable location={location} slug={slug} />
      <RealEstateListing location={location} slug={slug} />
      <ProjectsCta />
      <OffersBanner />
      </div>
    </div>
  )
}

export default SelectedProject
