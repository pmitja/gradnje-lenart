import type { FC, SVGProps } from 'react'

const DocumentIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="0.5" width="40" height="40" rx="8" fill="#E8EBED" />
    <path
      d="M17.5 20H23.5M17.5 24H23.5M25.5 29H15.5C14.3954 29 13.5 28.1046 13.5 27V13C13.5 11.8954 14.3954 11 15.5 11H21.0858C21.351 11 21.6054 11.1054 21.7929 11.2929L27.2071 16.7071C27.3946 16.8946 27.5 17.149 27.5 17.4142V27C27.5 28.1046 26.6046 29 25.5 29Z"
      stroke="#173247"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default DocumentIcon
