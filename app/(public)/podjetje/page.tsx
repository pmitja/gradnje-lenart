import Image from 'next/image'

import ContactUs from '@/components/common/contact-us'
import Cta from '@/components/common/cta'
import PartnersBanner from '@/components/common/partners-banner'
import PartnersCards from '@/components/common/partners-cards'
import { StatType } from '@/components/common/stat'
import Stats from '@/components/common/stats'
import OffersBanner from '@/components/layouts/sections/offers-banner'
import ShadowBanner from '@/components/ui/shadow-banner'

import { OfferInfo } from '../projekti/page'
import GradnjeIcon from '@/components/icons/gradnje-icon'

const stats: StatType[] = [
  {
    title: '+100',
    subtitle: 'nepremičnin zgrajenih',
  },
  {
    title: '+1200',
    subtitle: 'zadovoljnih strank',
  },
  {
    title: '99%',
    subtitle: 'zadovoljstva',
  },
]

const offersInfo: OfferInfo = {
  title: '2 sobno stanovanje',
  description: 'Velik skupni prostor s kuhinjo, spalnica, otroška soba in kopalnica.',
  linkHref: '#',
}

const OffersBannerImages = [
  '/stanovanje.jpg',
  '/stanovanje2.jpg',
  '/stanovanje3.jpg',
  '/stanovanje4.jpg',
]

const About = () => (
  <div>
    <ShadowBanner
      backgroundImagePath="/hero-image.webp"
      heading="Gradnje Plus"
      icon={<GradnjeIcon className="h-20 w-24 fill-primary-200" />}
      subheading="Nepremičnine niso zgolj nakup. So nepogrešljiv del vsakega izmed nas."
    />
    <PartnersBanner />
    <section className="flex flex-col gap-4 py-6">
      <p className="md:text-3xl font-bold text-2xl text-secondary-400">
        Nasledstvo, ki ustvarja sanje.
      </p>
      <p className="text-lg text-secondary-200 md:text-xl">
        Specializirano podjetje za nepremičnine ponuja celovite storitve, vključno z iskanjem,
        prodajo, oddajo in upravljanjem nepremičnin. Z izkušenimi agenti in strokovnim znanjem na
        trgu nepremičnin strankam nudijo zanesljivo podporo pri njihovih nepremičninskih potrebah,
        vključno s svetovanjem o naložbah ter upravljanjem nepremičninskih portfeljev. Zavezani so k
        ustvarjanju uspešnih in zadovoljnih strank.
      </p>
    </section>
    <section className="flex flex-col gap-4 py-6">
      <p className="text-2xl font-bold text-secondary-400 md:text-3xl">Naša zgodba</p>
      <div className="pb-3">
        <Stats stats={stats} />
      </div>
      <Image src="/timeline.png" alt="Timeline" width={1354} height={942} />
    </section>
    <section className="flex flex-col gap-4 py-6">
      <p className="text-2xl font-bold text-secondary-400 md:text-3xl">Partnerji</p>
      <PartnersCards />
    </section>
    <section className="py-6">
      <Cta />
    </section>
    <section className="py-6">
      <OffersBanner
        title="Ne spreglejte naše premium ponudbe"
        description="Pri nas vam omogočamo najti domove, ki ustrezajo vašemu življenjskemu slogu in aspiracijam. Odkrijte brezhibno nepremičninsko izkušnjo."
        images={OffersBannerImages}
        offerInfo={offersInfo}
      />
    </section>
    <section className="py-6">
      <ContactUs />
    </section>
  </div>
)

export default About
