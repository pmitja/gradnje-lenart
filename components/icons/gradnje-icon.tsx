import type { FC, SVGProps } from 'react'

import { cn } from '@/lib/utils'

interface GradnjeIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const GradnjeIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }: GradnjeIconProps) => (
  <svg
    className={cn(className)}
    width="116"
    height="101"
    viewBox="0 0 116 101"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 69.3546L26.0873 43.4821L52.1701 69.3546V94.7119H78.9011V37.9602H84.3685V100.203H46.7005V71.6026L26.0873 51.1574L5.47406 71.6026V100.203H0V69.3546Z"
    />
    <path
      d="M35.7531 45.397V27.3164L84.367 0.19334V21.6778H78.8996V9.47361L41.2271 30.4891V50.8242L35.7531 45.397Z"
    />
    <path
      d="M67.9512 27.1048H93.4924V32.532H73.4252V89.2837H67.9512V27.1048Z"
    />
    <path
      d="M41.2271 73.8515V100.202H35.7531V68.4243L41.2271 73.8515Z"
    />
    <path
      d="M98.9658 27.105H104.435V21.6777H109.909V27.105H115.384V32.5322H109.909V37.9595H104.435V32.5322H98.9658V27.105Z"
    />
    <path
      d="M104.436 43.3873H109.91V100.203H104.436V43.3873Z"
    />
  </svg>
)

export default GradnjeIcon
