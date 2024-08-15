'use client'

import XIcon from '@/components/icons/x-icon'
import ButtonWithIcon from '@/components/common/button-with-icon'
export interface NoResultsBannerProps {
  resetFilters: () => void
}

const NoResultsBanner: React.FC<NoResultsBannerProps> = ({ resetFilters }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-destructive-50 p-8'>
      <XIcon className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12' />
      <h3 className='text-md text-center font-bold text-black sm:text-lg md:text-2xl'>
        Za iskane rezultate ni zadetkov, prosim poizkusite ponovno.
      </h3>
      <ButtonWithIcon
        variant='secondary'
        className='text-md max-w-fit border-secondary-300 px-3 py-3 font-bold sm:text-lg md:px-6 md:text-2xl'
        onClick={resetFilters}
      >
        Ponastavi filter
      </ButtonWithIcon>
    </div>
  )
}

export default NoResultsBanner
