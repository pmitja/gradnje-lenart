'use client'

import XIcon from '@/components/icons/x-icon'
import ButtonWithIcon from '@/components/common/button-with-icon'
import { useAppStore } from '@/store/app'

const NoResultsBanner = () => {
  const { updateProjectFilters } = useAppStore()

  function resetFilters() {
    console.log('resetting filters')
    updateProjectFilters({
      location: 'all',
      type: 'all'
    })
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5 overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-destructive-50 p-8'>
      <XIcon
        width={50}
        height={50}
      />
      <h3 className='text-md text-center font-bold text-black sm:text-lg md:text-xl'>
        Za iskane rezultate ni zadetkov, prosim poizkusite ponovno.
      </h3>
      <ButtonWithIcon
        variant='secondary'
        className='max-w-fit border-secondary-300 px-6 py-3 text-xl font-bold'
        onClick={() => resetFilters()}
      >
        Poenostavi filter
      </ButtonWithIcon>
    </div>
  )
}

export default NoResultsBanner
