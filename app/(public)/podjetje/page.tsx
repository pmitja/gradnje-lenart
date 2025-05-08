import ContactUs from '@/components/common/contact-us'
import Cta from '@/components/common/cta'
import PartnersBanner from '@/components/common/partners-banner'
import ProjectsCta from '@/components/common/projects-cta'
import { StatType } from '@/components/common/stat'
import CompanyOverview from '@/components/company/company-overview'
import GradnjeIcon from '@/components/icons/gradnje-icon'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ShadowBanner from '@/components/ui/shadow-banner'

const stats: StatType[] = [
  {
    subtitle: 'nepremičnin zgrajenih',
    endValue: 100,
  },
  {
    subtitle: 'zadovoljnih strank',
    endValue: 1200,
  },
  {
    subtitle: 'zadovoljstva',
    endValue: 99,
    isPercentage: true,
  },
]

const companyMilestones = [
  {
    year: 2010, title: 'Ustanovitev podjetja', description: 'Začetek delovanja na nepremičninskem trgu.',
  },
  {
    year: 2013, title: 'Prva večja investicija', description: 'Uspešna izgradnja prvega stanovanjskega kompleksa.',
  },
  {
    year: 2016, title: 'Širitev poslovanja', description: 'Vstop na nove trge in razširitev ponudbe storitev.',
  },
  {
    year: 2018, title: 'Tehnološka prenova', description: 'Implementacija naprednih digitalnih rešitev.',
  },
  {
    year: 2021, title: 'Trajnostna gradnja', description: 'Prehod na okolju prijazne gradbene metode.',
  },
  {
    year: 2023, title: 'Mednarodna priznanja', description: 'Prejemnik nagrad za inovativne nepremičninske projekte.',
  },
]

const About = () => (
  <div>
    <ShadowBanner
      backgroundImagePath="/about-hero-image.webp"
      heading="Gradnje Plus"
      icon={<GradnjeIcon className="h-14 w-14 md:h-20 md:w-24 fill-primary-200" />}
      subheading="Nepremičnine niso zgolj nakup. So nepogrešljiv del vsakega izmed nas."
    />

    <CompanyOverview
      vision="Ustvarjamo prostore, kjer se življenje razvija in uspeva."
      strategy="Z inovativnim pristopom, trajnostno gradnjo in osredotočenostjo na potrebe strank gradimo prihodnost nepremičninskega trga."
      stats={stats}
      milestones={companyMilestones}
      culture="Naša kultura temelji na odličnosti, integriteti in trajnostnem razvoju. Združujemo strokovnost in inovativnost, da ustvarjamo nepremičnine, ki presegajo pričakovanja."
    />

    <PartnersBanner />
    <ProjectsCta backgroundImage="/abstract-pattern.png" />
    <Cta />
    <OffersBanner />
    <section className="py-6 lg:py-12">
      <ContactUs />
    </section>
  </div>
)

export default About
