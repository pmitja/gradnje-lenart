import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

import ButtonWithIcon from '../common/button-with-icon'

interface ImageLeftTextRightProps extends React.HTMLAttributes<HTMLElement> {
  image: {
    src: string
    alt: string
  }
  mobileImage?: {
    src: string
    alt: string
  }
  heading: string
  text: string
}

const ImageLeftTextRight = ({
  image,
  mobileImage,
  heading,
  text,
  className,
}: ImageLeftTextRightProps) => (
    <section
      className={cn(
        'grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16',
        className,
      )}
    >
      <div className='flex w-full items-center justify-center'>
        <Image
          src={image.src}
          alt={image.alt}
          width={670}
          height={350}
          className='hidden md:block'
        />
        {mobileImage && (
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            width={215}
            height={265}
            className='md:hidden'
          />
        )}
      </div>
      <div className='row-start-1 flex flex-col gap-6 md:gap-5 lg:row-start-auto'>
        <h2 className='text-4xl font-bold leading-[120%] text-secondary-400 md:text-[51px] md:leading-[57px] lg:leading-[76.5px]'>
          {heading}
        </h2>
        <p className='text-xl leading-6'>{text}</p>
        <ButtonWithIcon
          variant='primary'
          className='w-fit self-center px-6 py-4 text-xl md:self-start lg:mt-10'
        >
          Akutalni projekti
        </ButtonWithIcon>
      </div>
    </section>
)

export default ImageLeftTextRight
