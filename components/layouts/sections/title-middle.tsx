import React from 'react'

import { cn } from '@/lib/utils'

interface SectionWithTitleInMiddleProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const SectionWithTitleInMiddle = ({
  title,
  subtitle,
  children,
  className,
  ...props
}: SectionWithTitleInMiddleProps) => (
    <section
      className={cn('flex w-full flex-col gap-16 lg:gap-20 py-6 md:py-10 lg:py-28', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className='text-xl font-bold leading-tight text-secondary-200 sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight'>
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm text-secondary-200/80 sm:text-base md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      <div>{children}</div>
    </section>
)

export default SectionWithTitleInMiddle
