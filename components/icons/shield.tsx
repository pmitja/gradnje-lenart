import type { FC, SVGProps } from 'react'

const ShieldIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 54 66'
    fill='none'
    stroke='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M27 64.5C27 64.5 52 52 52 33.25V11.375L27 2L2 11.375V33.25C2 52 27 64.5 27 64.5Z'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default ShieldIcon
