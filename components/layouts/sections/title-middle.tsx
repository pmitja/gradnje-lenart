import { cn } from '@/lib/utils'

interface SectionWithTitleInMiddleProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  children: React.ReactNode
}

const SectionWithTitleInMiddle = ({
  title,
  children,
  className,
  ...props
}: SectionWithTitleInMiddleProps) => {
  return (
    <section
      className={cn('flex w-full flex-col gap-16 lg:gap-20', className)}
      {...props}
    >
      <h2 className='self-center text-4xl font-bold leading-[120%] text-secondary-200 md:text-[51px] md:leading-[57px] lg:leading-[76.5px]'>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}

export default SectionWithTitleInMiddle
