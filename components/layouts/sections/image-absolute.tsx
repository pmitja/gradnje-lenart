import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import ButtonWithIcon from '@/components/common/button-with-icon'
import { cn } from '@/lib/utils'

interface SectionWithImageAbsoluteProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  image: {
    src: string
    alt: string
  }
  text: string
}

const SectionWithImageAbsolute = ({
  title,
  text,
  image,
  className,
  ...props
}: SectionWithImageAbsoluteProps) => (
    <section
      className={cn('relative flex flex-col-reverse gap-5 my-6 md:my-10', className)}
      {...props}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={1440}
        height={550}
        className='relative max-h-[250px] rounded-2xl object-cover md:max-h-[550px] lg:max-h-[630px]'
      />
      <div className='left-0 top-0 flex flex-col gap-6 rounded-2xl rounded-bl-none rounded-tr-none bg-body-75 md:absolute md:max-w-[60%] md:pb-2 md:pr-2 lg:pb-[50px] lg:pr-6'>
        <h2 className='self-center text-xl font-bold leading-tight text-secondary-200 sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight'>
          {title}
        </h2>
        <p className='font-archivo text-sm leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg'>{text}</p>
        <ButtonWithIcon
          variant={'secondary'}
          className='w-fit'
        >
          Vstopite v stik
        </ButtonWithIcon>
      </div>
      <div className='absolute bottom-0 flex w-full grow-0 flex-row items-center justify-center gap-4 rounded-t-2xl bg-body-75 pt-2 md:right-0 md:flex md:max-w-[330px] md:rounded-tr-none md:p-2 lg:p-3'>
        <HomeIcon
          size={64}
          className='max-h-8 max-w-8 md:min-h-12 md:min-w-12 lg:min-h-16 lg:min-w-16'
        />
        <p className='break-words pt-2 font-archivo text-sm italic leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg'>
          Več kot 1000 nepremični zgrajenih in prodanih
        </p>
      </div>
    </section>
)

export default SectionWithImageAbsolute
