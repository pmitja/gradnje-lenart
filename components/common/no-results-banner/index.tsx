'use client'

import { ArrowRight, XIcon } from 'lucide-react'
import React from 'react'

import ButtonWithIcon from '../button-with-icon'

interface NoResultComponentProps {
  onReset: () => void
}

const NoResultComponent: React.FC<NoResultComponentProps> = ({ onReset }) => (
    <div className='flex flex-col items-center justify-center gap-5 overflow-hidden rounded-t-2xl bg-destructive-50 p-8'>
      <XIcon className='size-8 text-destructive-400 sm:size-10 md:size-12' />
      <h3 className='text-center text-base font-medium text-black sm:text-lg md:text-2xl'>
        Za iskane rezultate ni zadetkov, prosim poizkusite ponovno.
      </h3>
      <ButtonWithIcon
        variant='secondary'
        className='max-w-fit border-secondary-300 p-3 text-base font-bold sm:text-lg md:px-6 md:text-xl'
        onClick={onReset}
        icon={<ArrowRight />}
        iconPosition='right'
      >
        Ponastavi filter
      </ButtonWithIcon>
      </div>
)

export default NoResultComponent
