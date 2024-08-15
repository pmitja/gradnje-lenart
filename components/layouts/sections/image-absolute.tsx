import ButtonWithIcon from '@/components/common/button-with-icon'
import { cn } from '@/lib/utils'
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'

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
}: SectionWithImageAbsoluteProps) => {
  return (
    <section
      className={cn('relative flex flex-col-reverse gap-5', className)}
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
        <h2 className='self-center text-4xl font-bold leading-[120%] text-secondary-200 md:text-[51px] md:leading-[57px] lg:leading-[76.5px]'>
          {title}
        </h2>
        <p className='text-xl leading-6 text-secondary-200'>{text}</p>
        <ButtonWithIcon
          variant={'secondary'}
          className='w-fit'
        >
          Vstopite v stik
        </ButtonWithIcon>
      </div>
      <div className='absolute bottom-0 flex w-full grow-0 flex-row items-center justify-center gap-4 rounded-tl-2xl rounded-tr-2xl bg-body-75 md:right-0 md:flex md:max-w-[330px] md:rounded-tr-none md:p-2 lg:p-3'>
        <HomeIcon
          size={64}
          className='max-h-8 max-w-8 md:min-h-12 md:min-w-12 lg:min-h-16 lg:min-w-16'
        />
        <p className='break-words font-archivo text-xl italic leading-6 text-secondary-200'>
          Več kot 1000 nepremični zgrajenih in prodanih
        </p>
      </div>
    </section>
  )
}

export default SectionWithImageAbsolute
