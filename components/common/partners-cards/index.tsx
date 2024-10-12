import Image from 'next/image'

const partners = [
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 1',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 2',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 3',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 4',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 5',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 6',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 7',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 8',
  },
  {
    src: '/gradnje-plus-logo.webp',
    alt: 'Partner 9',
  },
]

const PartnersCards = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {partners.map((partner, index) => (
      <div key={index} className="flex items-center justify-center rounded-sm bg-primary-50 p-6 shadow-md">
        <Image src={partner.src} alt={partner.alt} width={186} height={60} />
      </div>
    ))}
  </div>
)

export default PartnersCards
