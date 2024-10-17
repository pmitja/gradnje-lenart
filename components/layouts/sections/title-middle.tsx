import React from 'react'

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
}: SectionWithTitleInMiddleProps) => (
    <section
      className={cn('flex w-full flex-col gap-16 lg:gap-20', className)}
      {...props}
    >
      <h2 className='self-center text-xl font-bold leading-tight text-secondary-200 sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight'>
        {title}
      </h2>
      <div>{children}</div>
    </section>
)

export default SectionWithTitleInMiddle
