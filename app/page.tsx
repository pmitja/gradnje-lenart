import Hero from '@/components/common/hero';
import ImageLeftTextRight from '@/components/layouts/image-left-text-right';

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
    </>
  );
}
