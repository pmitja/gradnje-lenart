import type { FC, SVGProps } from 'react'

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const BedIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }: ArrowRightIconProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path
      d="M34.345 11.863V6.39209C34.3438 4.40803 32.7375 2.80053 30.7529 2.79944H9.60703H9.24742C7.26273 2.80053 5.65617 4.40803 5.65539 6.39147V11.8629L0 26.029V34.6656C0.00140625 36.0655 1.13469 37.1987 2.53336 37.2005H2.58953H37.4119H37.4666C38.8653 37.1987 39.9985 36.0655 40 34.6668V26.029L34.345 11.863ZM8.5893 6.39272C8.58992 6.02959 8.88547 5.73374 9.24773 5.73374H30.7523C31.1148 5.73374 31.4104 6.02959 31.4109 6.39217V11.8607H29.6389V10.0058C29.6386 8.42999 28.3559 7.14702 26.7798 7.14647H23.3245C21.7486 7.14709 20.4662 8.42999 20.4657 10.0058V11.8607H19.5342V10.0058C19.5336 8.42999 18.2513 7.14702 16.6754 7.14647H13.2202C11.6439 7.14709 10.3613 8.42999 10.3611 10.0058V11.8607H8.5893V6.39272ZM27.9625 10.0058V11.8606H22.1422V10.0064C22.1434 9.35499 22.674 8.82405 23.3248 8.82342H26.7795C27.4306 8.82405 27.9613 9.35499 27.9625 10.0058ZM17.8578 10.0058V11.8606H12.0375V10.0064C12.0387 9.35499 12.5694 8.82405 13.2205 8.82342H16.6751C17.3259 8.82405 17.8566 9.35499 17.8578 10.0058ZM8.14578 13.5377H31.8545L32.3136 14.6873H7.68672L8.14578 13.5377ZM7.0175 16.3644H32.9827L36.6441 25.5361H3.35578L7.0175 16.3644ZM37.0661 34.2662H2.93398V27.213H37.0661V34.2662Z"
    />
  </svg>
)

export default BedIcon
