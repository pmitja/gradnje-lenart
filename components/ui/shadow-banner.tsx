import React from 'react'

type ShadowBannerProps = {
  backgroundImagePath: string
  icon: React.ReactNode
  heading: string
  subheading?: string
}

const ShadowBanner = ({ backgroundImagePath, icon, heading, subheading }: ShadowBannerProps) => (
  <div
    className="relative inset-x-1/2 mx-[-50vw] flex min-h-[55rem] w-screen min-w-[100vw] items-end overflow-hidden bg-cover bg-fixed bg-center pt-10 md:pt-16 lg:pt-0"
    style={{
      backgroundImage: `url(${backgroundImagePath})`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
    <div className="container relative flex size-full flex-col items-start justify-end gap-8 overflow-hidden pb-16 lg:w-full lg:grid-cols-2 lg:gap-8 lg:pb-20">
      <div className="flex items-center justify-start gap-4 text-body-200">
        <div className="mr-2 transition-all duration-300 hover:scale-110">
          {icon}
        </div>
        <h1 className="text-4xl font-bold uppercase tracking-wide drop-shadow-lg md:text-5xl lg:text-6xl">
          {heading}
        </h1>
      </div>
      {subheading && (
        <p className="max-w-5xl text-3xl font-bold leading-snug text-body-200 drop-shadow-lg md:text-4xl lg:text-5xl">
          {subheading}
        </p>
      )}
      <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-primary-300 via-secondary-200 to-transparent"></div>
    </div>
  </div>
)

export default ShadowBanner
