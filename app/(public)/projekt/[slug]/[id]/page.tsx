import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import { getRealEstateById } from '@/actions/get-real-estate-by-id'
import Cta from '@/components/common/cta'
import RealEstateHero from '@/components/common/hero/real-estate-hero'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import { SpacesType } from '@/types/general'

import DetailViewRealEstate from './_components/detail-view-real-estate'

const SingleProjectPage = async ({ params }: { params: { slug: string; id: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString())

  const realEstates = await getRealEstateById(params.id.toString())

  if (!realEstates || !location) {
    return null
  }

  return (
    <div>
      <RealEstateHero
        id={params.id}
        title={realEstates.name}
        address={`${location.city}, ${location.address}`}
        size={realEstates.size?.toString() || '0'}
        parkingSpaces={realEstates.parkingSpaces ?? 0}
        status={realEstates.status}
      />
      <DetailViewRealEstate
        id={params.id}
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
      />
      <div className="mt-5 flex flex-col gap-5 lg:mt-10 lg:gap-10">
        <Cta />
        <OffersBanner />
      </div>
    </div>
  )
}

export default SingleProjectPage
