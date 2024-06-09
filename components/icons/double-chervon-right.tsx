import type { FC, SVGProps } from 'react';

const DoubleChervonRightIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    stroke="currentColor">
    <path
      d="M13 5L20 12L13 19M5 5L12 12L5 19"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DoubleChervonRightIcon;
