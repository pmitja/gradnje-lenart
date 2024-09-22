import type { FC, SVGProps } from 'react'

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const WcIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }: ArrowRightIconProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_319_709)">
      <path
        d="M23.2316 13.2518C22.988 12.9121 22.5952 12.7105 22.1772 12.7105H22.049C21.4896 12.7105 20.9934 13.0689 20.8175 13.5998L18.0292 22.014L15.228 13.5981C15.0515 13.0682 14.5557 12.7105 13.997 12.7105H13.9138C13.9086 12.7105 13.9032 12.7108 13.8983 12.7108C13.8929 12.7108 13.8877 12.7105 13.8826 12.7105H13.7815C13.2221 12.7105 12.7258 13.0689 12.5498 13.5998L9.76168 22.014L6.96056 13.5981C6.78416 13.0682 6.28816 12.7105 5.72958 12.7105H5.60117C5.18294 12.7105 4.79034 12.9121 4.54659 13.2518C4.30284 13.5918 4.23823 14.0285 4.37241 14.4244L8.4357 26.4086C8.61423 26.9353 9.10841 27.2894 9.66456 27.2894H9.71824C9.73373 27.2894 9.74892 27.2886 9.76431 27.288C9.7796 27.2886 9.79489 27.2894 9.81029 27.2894H9.84613C10.4031 27.2894 10.8979 26.9339 11.0757 26.4063L13.8954 18.0341L16.7023 26.4045C16.8797 26.9332 17.3749 27.2894 17.9325 27.2894H17.9859C18.0014 27.2894 18.0166 27.2886 18.0321 27.288C18.0472 27.2886 18.0626 27.2894 18.078 27.2894H18.114C18.67 27.2894 19.1641 26.9353 19.3427 26.4086L23.406 14.4244C23.5401 14.0285 23.4752 13.5919 23.2316 13.2518Z"
        fill="#102332"
      />
      <path
        d="M35.2284 23.5235C34.7467 23.0763 34.0068 23.0599 33.5058 23.4853C32.6429 24.2178 31.53 24.6213 30.3724 24.6213C27.7325 24.6213 25.5848 22.5443 25.5848 19.9913C25.5848 17.4479 27.7325 15.3788 30.3724 15.3788C31.5412 15.3788 32.6531 15.7754 33.5036 16.4955C34.0187 16.9315 34.7821 16.9 35.2594 16.4227L35.3027 16.3794C35.5603 16.122 35.6975 15.7682 35.6814 15.4044C35.6651 15.0407 35.4969 14.7004 35.2176 14.4669C33.8636 13.3344 32.1426 12.7106 30.3723 12.7106C26.2611 12.7106 22.9163 15.9767 22.9163 19.9914C22.9163 24.0156 26.2611 27.2896 30.3723 27.2896C32.1398 27.2896 33.8652 26.6611 35.2309 25.5195C35.5167 25.2805 35.6861 24.9304 35.6956 24.5581C35.7055 24.1856 35.5545 23.8269 35.2817 23.5735L35.2284 23.5235Z"
        fill="#102332"
      />
      <path
        d="M31.6963 0H8.3037C3.72506 0 0 3.72496 0 8.3036V31.6953C0 36.2745 3.72506 40 8.3037 40H31.6963C36.275 40 40 36.2745 40 31.6953V8.3036C40 3.72496 36.275 0 31.6963 0ZM38.481 31.6953C38.481 35.437 35.4375 38.481 31.6963 38.481H8.3037C4.56263 38.481 1.51899 35.437 1.51899 31.6953V8.3036C1.51899 4.56253 4.56263 1.51899 8.3037 1.51899H31.6963C35.4375 1.51899 38.481 4.56253 38.481 8.3036V31.6953Z"
        fill="#102332"
      />
    </g>
    <defs>
      <clipPath id="clip0_319_709">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default WcIcon
