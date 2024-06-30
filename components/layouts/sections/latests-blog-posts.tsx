import BlogTeaser from '@/components/common/blog-teaser';

const LatestBlogPosts = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
      <BlogTeaser
        text="Odkrijte, kako prepoznati energetsko varčne domove."
        title="Kako Prepoznati Energetsko Varčno Nepremičnino: Ključni Indikatorji"
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
        link="/"
      />
      <BlogTeaser
        text="Odkrijte, kako prepoznati energetsko varčne domove."
        title="Kako Prepoznati Energetsko Varčno Nepremičnino: Ključni Indikatorji"
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
        link="/"
        className='hidden md:block'
      />
      <BlogTeaser
        text="Odkrijte, kako prepoznati energetsko varčne domove."
        title="Kako Prepoznati Energetsko Varčno Nepremičnino: Ključni Indikatorji"
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
        link="/"
        isHighlighted
        className='md:col-span-2'
      />
      <BlogTeaser
        text="Odkrijte, kako prepoznati energetsko varčne domove."
        title="Kako Prepoznati Energetsko Varčno Nepremičnino: Ključni Indikatorji"
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
        link="/"
        className='hidden md:block'
      />
      <BlogTeaser
        text="Odkrijte, kako prepoznati energetsko varčne domove."
        title="Kako Prepoznati Energetsko Varčno Nepremičnino: Ključni Indikatorji"
        image={{ src: '/apartment-image.webp', alt: 'Image' }}
        link="/"
        className='hidden md:block'
      />
    </div>
  );
};

export default LatestBlogPosts;