import ProjectFilterHero from '@/components/common/hero/project-filter-hero'
import ProccesOfBuying from '@/components/common/procces-of-buying'
import Faq from '@/components/layouts/sections/faq'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ProjectsSection from '@/components/layouts/sections/projects-section'

const OffersBannerImages = [
  '/stanovanje.jpg',
  '/stanovanje2.jpg',
  '/stanovanje3.jpg',
  '/stanovanje4.jpg',
]

export interface OfferInfo {
  title: string
  description: string
  linkLabel?: string
  linkHref: string
}

const offersInfo: OfferInfo = {
  title: '2 sobno stanovanje',
  description: 'Velik skupni prostor s kuhinjo, spalnica, otroška soba in kopalnica.',
  linkHref: '#',
}

const ActualProjectPage = () => (
    <>
      <ProjectFilterHero />
      <ProjectsSection />
      <ProccesOfBuying />
      <OffersBanner
        title='Ne spreglejte te ponudbe'
        description='Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.'
        images={OffersBannerImages}
        offerInfo={offersInfo}
      />
      <Faq />
    </>
)

export default ActualProjectPage
