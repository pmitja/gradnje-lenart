import FeaturedProperties from '@/components/common/featured-properties'
import Hero from '@/components/common/hero'
import PartnersBanner from '@/components/common/partners-banner'
import Testimonials from '@/components/common/testimonials'
import WhyChooseUs from '@/components/common/why-choose-us'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProperties />
      <PartnersBanner />
      <WhyChooseUs />
      <Testimonials />
    </div>
  )
}
