import ProjectFilterHero from '@/components/common/hero/project-filter-hero'
import ProccesOfBuying from '@/components/common/procces-of-buying'
import Faq from '@/components/layouts/sections/faq'
import ProjectsSection from '@/components/layouts/sections/projects-section'
import OffersBanner from '@/components/layouts/sections/offers-banner'

const OffersBannerImages = ['/stanovanje.jpg', '/stanovanje2.jpg', '/stanovanje3.jpg']

const ActualProjectPage = () => {
  return (
    <>
      <ProjectFilterHero />
      <ProjectsSection />
      <ProccesOfBuying />
      <OffersBanner
        title='Ne spreglejte te ponudbe'
        buttonLabel='Več o nepremičnini'
        description='Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo.'
        images={OffersBannerImages}
      />
      <Faq />
    </>
  )
}

export default ActualProjectPage
