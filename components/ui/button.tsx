import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'cursor-pointer rounded-2xl border border-secondary-400 bg-transparent px-6 py-4 font-archivo text-base leading-5 tracking-wide text-secondary-300',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primary:
          'cursor-pointer rounded-2xl bg-primary-300 px-6 py-4 font-archivo text-base font-bold leading-5 tracking-wide text-body-100',
        rounded: 'rounded-full bg-primary-300',
        form: 'cursor-pointer bg-primary-300 font-archivo text-base font-bold leading-5 tracking-wide text-white hover:bg-primary-300/50',
        plain: 'bg-transparent text-inherit',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
        'large-bold': 'text-xl font-bold leading-6',
        rounded: 'h-auto p-4',
        plain: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({
          variant, size, className,
        }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export {
  Button, buttonVariants,
}
