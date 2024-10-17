import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'
import { PublicProjekti } from '@/routes'

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
        'grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 py-6 md:py-10 lg:py-28',
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
        <h2 className='text-xl font-bold leading-tight sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight'>
          {heading}
        </h2>
        <p className='font-archivo text-sm leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg'>{text}</p>
        <PublicProjekti.Link>
          <ButtonWithIcon
            variant='primary'
            className='w-fit self-center px-6 py-4 md:self-start lg:mt-10'
        >
          Akutalni projekti
          </ButtonWithIcon>
        </PublicProjekti.Link>
      </div>
    </section>
)

export default ImageLeftTextRight
