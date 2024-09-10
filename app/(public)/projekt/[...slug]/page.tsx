import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import Cta from '@/components/common/cta'
import InnerHero from '@/components/common/hero/inner-hero'
import OffersBanner, { OfferInfo } from '@/components/layouts/sections/offers-banner'
import RealEstateListing from '@/components/layouts/sections/single-project'

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

const SelectedProject = async ({ params }: { params: { slug: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString())

  if (!location) {
    return null
  }

  return (
    <>
      <InnerHero />
      {/* <SingleProject location={location} /> */}
      <RealEstateListing location={location} />
      <Cta />
      <OffersBanner
        title='Ne spreglejte te ponudbe'
        description='Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.'
        images={OffersBannerImages}
        offerInfo={offersInfo}
      />
    </>
  )
}

export default SelectedProject
