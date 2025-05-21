import Image from "next/image"

// Partner logos data with placeholder images
const partners = [
  {
    name: 'NLB d.d.',
    logo: '/nlb-logo.svg', // Using existing image as placeholder
  },
  {
    name: 'Marles Hiše Maribor d.o.o.',
    logo: '/marles-logo.svg',
  },
  {
    name: 'Preklade d.o.o.',
    logo: '/preklade-logo-siva-retina.png',
  },
  {
    name: 'GTP Kramberger d.o.o.',
    logo: '/gtp-kamberger.png',
  },
  {
    name: 'THS d.o.o.',
    logo: '/ths-logo.webp',
  },
  {
    name: 'Rajmax d.o.o.',
    logo: '/rajmax-logo.png',
  },
  {
    name: 'Elektro Amper Mont d.o.o.',
    logo: '/elektro-aper-mont-logo.webp',
  },
]

const PartnersBanner = () => (
  <div className="relative py-16">
      <div className="mb-10 text-center">
        <h3 className="mb-2 text-2xl font-bold text-secondary-300">Naši zaupanja vredni partnerji</h3>
        <p className="mx-auto max-w-2xl text-secondary-200">
          Sodelujemo z vodilnimi blagovnimi znamkami v industriji,
          da zagotovimo najvišjo kakovost za vaš dom
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {/* Main marquee container */}
        <div className="group flex w-full overflow-hidden [--duration:40s] [--gap:2rem]">
          {/* First copy of partners - this will scroll */}
          <div
            className="flex shrink-0 animate-marquee items-center gap-8 group-hover:[animation-play-state:paused]"
            style={{
              paddingRight: 'var(--gap)',
            }}
          >
            {partners.map((partner, i) => (
              <div
                key={`first-${i}`}
                className="flex h-24 w-[200px] shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <Image src={partner.logo} alt={partner.name} width={200} height={200} className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>

          {/* Second copy of partners - creates the seamless loop */}
          <div
            className="flex shrink-0 animate-marquee items-center gap-8 group-hover:[animation-play-state:paused]"
            style={{
              paddingRight: 'var(--gap)',
            }}
            aria-hidden="true"
          >
            {partners.map((partner, i) => (
              <div
                key={`second-${i}`}
                className="flex h-24 w-[200px] shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <Image src={partner.logo} alt={partner.name} width={200} height={200} className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-body-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-body-50 to-transparent" />
      </div>
  </div>
)

export default PartnersBanner
