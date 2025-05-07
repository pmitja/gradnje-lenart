import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import { getRealEstateById } from '@/actions/get-real-estate-by-id'
import Cta from '@/components/common/cta'
import RealEstateHero from '@/components/common/hero/real-estate-hero'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import { LocationType, SpacesType } from '@/types/general'

import DetailViewRealEstate from './_components/detail-view-real-estate'
import ProjectsCta from '@/components/common/projects-cta'

interface PageProps {
  params: Promise<{ slug: string; id: string }>
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
