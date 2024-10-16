import React from 'react'

type ShadowBannerProps = {
  backgroundImagePath: string
  icon: React.ReactNode
  heading: string
  subheading?: string
}

const ShadowBanner = ({ backgroundImagePath, icon, heading, subheading }: ShadowBannerProps) => (
  <div
    className="relative inset-x-1/2 mx-[-50vw] flex min-h-[40rem] w-screen min-w-[100vw] items-end overflow-hidden bg-gradient-to-b from-transparent to-black/60 bg-cover bg-center pt-10 md:pt-16 lg:pt-0"
    style={{
      backgroundImage: `url(${backgroundImagePath})`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
    <div className="container relative flex size-full flex-col items-start justify-end gap-8 overflow-hidden pb-8 lg:w-full lg:grid-cols-2 lg:gap-5 lg:pb-8 lg:pt-20">
      <div className="flex items-center justify-start gap-3 text-body-200">
        {icon}
        <h1 className="text-3xl font-bold uppercase md:text-4xl">{heading}</h1>
      </div>
      {subheading && <p className="max-w-5xl text-3xl font-bold leading-snug text-body-200 md:text-4xl">
        {subheading}
      </p>}
    </div>
  </div>
)

export default ShadowBanner
