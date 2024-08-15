import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const containerVariants = cva('mx-auto px-2 sm:px-10 lg:px-20', {
  variants: {
    variant: {
      outer: 'max-w-8xl',
      inner: 'max-w-8xl px-6 lg:px-[172px]',
      navigation: 'max-w-8xl bg-navigation-banner bg-left-top py-14s',
      form: 'max-w-[848px]'
    }
  },
  defaultVariants: {
    variant: 'outer'
  }
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container: React.FC<ContainerProps> = ({
  asChild,
  className,
  children,
  variant,
  ...props
}) => {
  if (asChild) {
    return <>{children}</>
  }

  const containerClasses = cn(
    containerVariants({
      variant
    }),
    className
  )

  return (
    <div
      className={asChild ? undefined : containerClasses}
      {...props}
    >
      {variant === 'outer' ? <div>{children}</div> : children}
    </div>
  )
}

export { Container, containerVariants }
