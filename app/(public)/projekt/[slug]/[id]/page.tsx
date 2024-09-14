import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import { getRealEstateById } from '@/actions/get-real-estate-by-id'
import Cta from '@/components/common/cta'
import RealEstateHero from '@/components/common/hero/real-estate-hero'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import { OfferInfo } from '@/types/general'

import DetailViewRealEstate from './_components/detail-view-real-estate'

const OffersBannerImages = [
  '/stanovanje.jpg',
  '/stanovanje2.jpg',
  '/stanovanje3.jpg',
  '/stanovanje4.jpg',
]

const offersInfo: OfferInfo = {
  title: '2 sobno stanovanje',
  description: 'Velik skupni prostor s kuhinjo, spalnica, otroška soba in kopalnica.',
  linkHref: '#',
}

// TODO: FETCH REAL EXPOSED REAL ESTAES

const SingleProjectPage = async ({ params }: { params: { slug: string; id: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString())

  const realEstates = await getRealEstateById(params.id.toString())

  if (!realEstates || !location) {
    return null
  }

  return (
    <div>
      <RealEstateHero
        title={realEstates.name}
        address={`${location.city}, ${location.address}`}
        size={realEstates.size?.toString() || '0'}
        parkingSpaces={realEstates.parkingSpaces ?? 0}
      />
      <DetailViewRealEstate description={realEstates.description ?? ''} technicalData={realEstates.technicalData as {id: string, text: string}[]} />
      <div className="mt-5 flex flex-col gap-5 lg:mt-10 lg:gap-10">
        <Cta />
        <OffersBanner
          title="Ne spreglejte te ponudbe"
          description="Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo."
          images={OffersBannerImages}
          offerInfo={offersInfo}
        />
      </div>
    </div>
  )
}

export default SingleProjectPage
