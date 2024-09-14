import type { FC, SVGProps } from 'react'

import { cn } from '@/lib/utils'

interface ArrowSearchIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const ArrowSearchIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}: ArrowSearchIconProps) => (
  <svg
    className={cn(className)}
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 21L15.5 15M17.5 10C17.5 13.866 14.366 17 10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowSearchIcon
