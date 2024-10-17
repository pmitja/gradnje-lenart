'use client'

import { useEffect, useState } from 'react'

import { getRandomExposedRealEstate } from '@/actions/get-random-exposed-real-estate'
import ButtonWithIcon from '@/components/common/button-with-icon'
import ImageGallery from '@/components/common/image-gallery'
import { PublicProjektSlugId } from '@/routes'
import { OfferInfo } from '@/types/general'

const OffersBanner = () => {
  const [ exposedRealEstate, setExposedRealEstate ] = useState<any>(null)

  useEffect(() => {
    const fetchExposedRealEstate = async () => {
      const realEstate = await getRandomExposedRealEstate()

      setExposedRealEstate(realEstate)
    }

    fetchExposedRealEstate()
  }, [])

  if (!exposedRealEstate) {
    return null // or a loading state
  }

  const offerInfo: OfferInfo = {
    title: exposedRealEstate.name,
    description: exposedRealEstate.shortDescription,
    linkHref: `/projekt/${exposedRealEstate.location.slug}/${exposedRealEstate.id}`,
    linkLabel: 'Več o nepremičnini',
  }

  return (
    <section className='flex flex-col gap-8 py-6 md:py-10 lg:py-20'>
      <div className='flex w-full flex-row flex-wrap justify-between gap-4'>
        <h3 className='text-2xl font-bold text-secondary-400 md:text-3xl'>{exposedRealEstate.name}</h3>
        <PublicProjektSlugId.Link
          slug={exposedRealEstate.location.slug}
          id={exposedRealEstate.id}
        >
          <ButtonWithIcon
            variant={'secondary'}
            className='w-fit'
          >
            Več o nepremičnini
          </ButtonWithIcon>
        </PublicProjektSlugId.Link>
      </div>
      <div className='max-w-2xl'>
        <p className='text-secondary-100'>{exposedRealEstate.shortDescription || exposedRealEstate.description}</p>
      </div>
      <ImageGallery
        images={exposedRealEstate.images}
        offerInfo={offerInfo}
      />
    </section>
  )
}

export default OffersBanner
