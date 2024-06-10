import Hero from '@/components/common/hero';
import Partners from '@/components/common/partners';
import BrickWallIcon from '@/components/icons/brick-wall';
import CarIcon from '@/components/icons/car';
import EnergySavingIcon from '@/components/icons/energy-saving';
import ShieldIcon from '@/components/icons/shield';
import ImageLeftTextRight from '@/components/layouts/image-left-text-right';
import SectionWithTitleInMiddle from '@/components/layouts/sections/title-middle';

export default function Home() {
  return (
    <>
      <Hero />
      <ImageLeftTextRight
        image={{ src: '/trio-cards.webp', alt: 'Hero' }}
        mobileImage={{ src: '/gradnje-plus-logo-card.webp', alt: 'Hero' }}
        heading="Nepremičnine niso zgolj nakup. So nepogrešljiv del vsakega izmed nas."
        text="Odkrijte edinstvene nepremičnine z našimi storitvami. Gradnje 
        Plus vam pomagajo pri svetovanju, prodaji in odkup nepremičnin."
      />
      <Partners />
      <SectionWithTitleInMiddle title="Prednosti">
        dafs
      </SectionWithTitleInMiddle>
    </>
  );
}
