import type { FC, SVGProps } from 'react'

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const TvIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }: ArrowRightIconProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M0.800049 30.4H19.2V32.8H9.60005V34.4H30.4V32.8H20.8V30.4H39.2001V6.39999H0.800049V30.4ZM2.40005 7.99999H37.6V28.8H2.40005V7.99999Z" />
  </svg>
)

export default TvIcon
