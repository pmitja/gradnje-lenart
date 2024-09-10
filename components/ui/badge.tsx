import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full', {
  variants: {
    variant: {
      default:
        'font-base flex max-w-fit gap-[10px] rounded-2xl bg-primary-500 px-5 py-2 font-archivo font-semibold leading-5 text-body-200',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'text-foreground',
      pills: 'flex flex-wrap gap-3 rounded-md bg-primary-75 px-3 py-2.5 text-secondary-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({
        variant,
      }), className)}
      {...props}
    />
  )
}

export {
  Badge, badgeVariants,
}
