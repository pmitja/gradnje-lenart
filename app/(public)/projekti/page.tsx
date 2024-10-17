import ProjectFilterHero from '@/components/common/hero/project-filter-hero'
import ProccesOfBuying from '@/components/common/procces-of-buying'
import Faq from '@/components/layouts/sections/faq'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ProjectsSection from '@/components/layouts/sections/projects-section'

const ActualProjectPage = () => (
  <div>
    <ProjectFilterHero />
    <ProjectsSection />
    <ProccesOfBuying />
    <OffersBanner />
    <Faq />
  </div>
)

export default ActualProjectPage
