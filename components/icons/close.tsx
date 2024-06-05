import type { FC, SVGProps } from 'react';

const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" stroke="#6C914E" />
    <path d="M9 14.9996L15 8.99963" stroke="#6C914E" />
    <path d="M15 15L9 9" stroke="#6C914E" />
  </svg>
);

export default CloseIcon;
