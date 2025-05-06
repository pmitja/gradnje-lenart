import Hero from '@/components/common/hero'
import PartnersBanner from '@/components/common/partners-banner'
import WhyChooseUs from '@/components/common/why-choose-us'
import PropertyListingSection from '@/components/layouts/sections/property-listing-section'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <PropertyListingSection />
      <PartnersBanner />
      <WhyChooseUs />
    </div>
  )
}
