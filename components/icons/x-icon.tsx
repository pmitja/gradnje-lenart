import type { FC, SVGProps } from 'react'

const XIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='52'
    height='52'
    viewBox='0 0 52 52'
    fill='none'
    stroke='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M1 51L51 1M1 1L51 51'
      stroke='#9A1F18'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default XIcon
