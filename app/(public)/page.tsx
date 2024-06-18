import Cta from '@/components/common/cta';
import FeatureCards from '@/components/common/feature-cards';
import Hero from '@/components/common/hero';
import Partners from '@/components/common/partners';
import Testimonials from '@/components/common/testimonials';
import ImageLeftTextRight from '@/components/layouts/image-left-text-right';
import Faq from '@/components/layouts/sections/faq';
import SectionWithImageAbsolute from '@/components/layouts/sections/image-absolute';
import LatestBlogPosts from '@/components/layouts/sections/latests-blog-posts';
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
        <FeatureCards />
      </SectionWithTitleInMiddle>
      <SectionWithImageAbsolute
        text={
          'Naj bo vaš dom oaza dobrega počutja. Znižaj stres, povečaj zadovoljstvo in izboljšaj spanec s pozitivnim in udobnim okoljem.'
        }
        title="Najdimo vam dom, o katerem sanjate. Na vas je, da spišete najlepšo zgodbo."
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
      />
      <Testimonials />
      <Cta />
      <SectionWithTitleInMiddle title="Zadnje blog objave">
        <LatestBlogPosts />
      </SectionWithTitleInMiddle>
      <Faq />
    </>
  );
}
