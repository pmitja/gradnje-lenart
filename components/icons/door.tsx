import type { FC, SVGProps } from 'react'

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const DoorIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}: ArrowRightIconProps) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className={className} {...props}>
    <path
      d="M37.5 36.5625H35.9375V5C35.9375 4.4825 35.5175 4.0625 35 4.0625H27.5C26.9825 4.0625 26.5625 4.4825 26.5625 5C26.5625 5.5175 26.9825 5.9375 27.5 5.9375H34.0625V37.5C34.0625 38.0175 34.4825 38.4375 35 38.4375H37.5C38.0175 38.4375 38.4375 38.0175 38.4375 37.5C38.4375 36.9825 38.0175 36.5625 37.5 36.5625ZM22.3162 1.575L7.345 4.075C6.89875 4.1525 6.5625 4.5375 6.5625 5V36.5625H2.5C1.9825 36.5625 1.5625 36.9825 1.5625 37.5C1.5625 38.0175 1.9825 38.4375 2.5 38.4375H22.4712C22.9887 38.4375 23.4087 38.0175 23.4087 37.5V2.5C23.4075 1.9825 22.9875 1.5625 22.47 1.5625C22.4163 1.5625 22.3625 1.5675 22.3113 1.57625L22.3162 1.575ZM8.4375 36.5625V5.79375L21.5337 3.6075V36.5625H8.4375ZM17.4738 19.125C17.3713 19.0875 17.2525 19.065 17.1287 19.065C16.8663 19.065 16.6275 19.1637 16.4475 19.3263L16.4488 19.325C16.2788 19.4988 16.1737 19.7375 16.1737 20C16.1737 20.2625 16.2788 20.5013 16.4488 20.675C16.63 20.8275 16.8663 20.9213 17.1225 20.9237H17.1238C17.2488 20.9213 17.37 20.9038 17.4838 20.8713L17.4738 20.8737C17.5912 20.825 17.69 20.7588 17.7738 20.675C17.9438 20.5013 18.0487 20.2625 18.0487 20C18.0487 19.7375 17.9438 19.4988 17.7738 19.325C17.69 19.24 17.59 19.1725 17.4788 19.1275L17.4725 19.125H17.4738Z"
    />
  </svg>
)

export default DoorIcon
