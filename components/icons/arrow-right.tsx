import type { FC, SVGProps } from 'react'
import { cn } from '@/lib/utils'

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const ArrowRightIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}: ArrowRightIconProps) => (
  <svg
    className={cn(className)}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M18 12L18.7071 11.2929L19.4142 12L18.7071 12.7071L18 12ZM6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11V13ZM14.7071 7.29289L18.7071 11.2929L17.2929 12.7071L13.2929 8.70711L14.7071 7.29289ZM18.7071 12.7071L14.7071 16.7071L13.2929 15.2929L17.2929 11.2929L18.7071 12.7071ZM18 13H6V11H18V13Z' />
  </svg>
)

export default ArrowRightIcon
