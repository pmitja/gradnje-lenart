import ContactUs from '@/components/common/contact-us'
import PartnersBanner from '@/components/common/partners-banner'
import ProjectsCta from '@/components/common/projects-cta'
import { StatType } from '@/components/common/stat'
import CompanyOverview from '@/components/company/company-overview'
import GradnjeIcon from '@/components/icons/gradnje-icon'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ShadowBanner from '@/components/ui/shadow-banner'

const stats: StatType[] = [
  {
    subtitle: 'let izkušenj v gradbeništvu',
    endValue: 40,
  },
  {
    subtitle: 'zadovoljnih strank',
    endValue: 500,
  },
  {
    subtitle: 'leta Nominacija štajerski gospodarski oskar za najperspektivnejše podjetje',
    endValue: 2022,
    isYear: true,
  },
]

const companyMilestones = [
  {
    year: 2016, title: 'Visoke in nizke gradnje', description: 'Začetek delovanja na nepremičninskem trgu in prva večja investicija',
  },
  {
    year: 2019, title: 'Širitev poslovanja', description: 'Vstop na nove trge in razširitev ponudbe storitev.',
  },
  {
    year: 2022, title: 'Narodno priznanje', description: 'Iskanje energetsko varčnih in tehnološko naprednih rešitev gradnje.',
  }
]

const About = () => (
  <div>
    <ShadowBanner
      backgroundImagePath="/about-hero-image.webp"
      heading="Gradnje Plus"
      icon={<GradnjeIcon className="h-14 w-14 md:h-20 md:w-24 fill-primary-200" />}
      subheading="Nepremičnine niso zgolj nakup. So nepogrešljiv del vsakega izmed nas."
    />
    <PartnersBanner />
    <CompanyOverview
      vision="Ustvarjamo prostore, kjer se življenje razvija in uspeva."
      strategy="Z inovativnim pristopom, trajnostno gradnjo in osredotočenostjo na potrebe strank gradimo prihodnost nepremičninskega trga."
      stats={stats}
      milestones={companyMilestones}
      culture="Naša kultura temelji na odličnosti, integriteti in trajnostnem razvoju. Združujemo strokovnost in inovativnost, da ustvarjamo nepremičnine, ki presegajo pričakovanja."
    />

    <ProjectsCta backgroundImage="/abstract-pattern.png" />
    <OffersBanner />
    <section className="py-6 lg:py-12">
      <ContactUs />
    </section>
  </div>
)

export default About
