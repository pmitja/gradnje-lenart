import { getLocationRealEstates } from '@/actions/get-location-real-esatates'
import InnerHero from '@/components/common/hero/inner-hero'
import ProjectsCta from '@/components/common/projects-cta'
import RealEstateTable from '@/components/common/real-estate-table'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import RealEstateListing from '@/components/layouts/sections/single-project'

const SelectedProject = async ({ params }: { params: { slug: string } }) => {
  const location = await getLocationRealEstates(params.slug.toString())

  if (!location) {
    return null
  }

  return (
    <div>
      <InnerHero title={location.name} />
      <div className='mt-5 flex flex-col gap-5 lg:mt-10 lg:gap-10'>
      <RealEstateTable location={location} slug={params.slug.toString()} />
      <RealEstateListing location={location} slug={params.slug.toString()} />
      <ProjectsCta />
      <OffersBanner />
      </div>
    </div>
  )
}

export default SelectedProject
