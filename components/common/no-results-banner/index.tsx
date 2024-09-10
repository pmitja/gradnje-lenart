'use client'

import React from 'react'

import ButtonWithIcon from '@/components/common/button-with-icon'
import XIcon from '@/components/icons/x-icon'

export interface NoResultsBannerProps {
  resetFilters: () => void
}

const NoResultsBanner: React.FC<NoResultsBannerProps> = ({ resetFilters }) => (
    <div className='flex flex-col items-center justify-center gap-5 overflow-hidden rounded-t-2xl bg-destructive-50 p-8'>
      <XIcon className='size-8 sm:size-10 md:size-12' />
      <h3 className='text-md text-center font-bold text-black sm:text-lg md:text-2xl'>
        Za iskane rezultate ni zadetkov, prosim poizkusite ponovno.
      </h3>
      <ButtonWithIcon
        variant='secondary'
        className='text-md max-w-fit border-secondary-300 p-3 font-bold sm:text-lg md:px-6 md:text-2xl'
        onClick={resetFilters}
      >
        Ponastavi filter
      </ButtonWithIcon>
    </div>
)

export default NoResultsBanner
