import type { FC, SVGProps } from 'react'

const CarIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 80 80'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M75.1522 34.7722C75.1266 34.7629 75.0927 34.7548 75.0664 34.7475L68.6147 32.9687L64.3125 23.7311C63.8431 22.7322 63.1034 21.8847 62.1771 21.2845C61.2509 20.6844 60.1751 20.3557 59.0716 20.3356L30.2969 19.879C30.268 19.879 30.2392 19.879 30.2105 19.879C29.2638 19.8785 28.3311 20.1071 27.4918 20.5451C26.6526 20.9832 25.9318 21.6177 25.3909 22.3947L18.0628 32.9064L8.07656 34.9423C6.06678 35.3573 4.2607 36.4504 2.96097 38.0386C1.66124 39.6267 0.946845 41.6133 0.9375 43.6654V52.3959C0.9375 53 1.45859 53.4375 2.0625 53.4375H7.50781C8.30344 57.3437 11.6658 60.0695 15.6817 60.0695C19.6977 60.0695 23.06 57.3437 23.8556 53.4375H56.842C57.2166 55.3251 58.2379 57.0229 59.7299 58.2383C61.222 59.4537 63.0913 60.1106 65.0156 60.0956C66.9323 60.0962 68.7911 59.4392 70.2816 58.2344C71.7722 57.0295 72.8043 55.3498 73.2055 53.4756C74.7575 53.4684 76.2438 52.8484 77.3408 51.7505C78.4378 50.6526 79.0566 49.1657 79.0625 47.6137V40.3039C79.0574 39.0919 78.6793 37.911 77.9797 36.9213C77.2802 35.9317 76.293 35.1813 75.1522 34.7722ZM62.3281 24.6543L66.1177 32.795H52.0312V22.4117L59.0373 22.5229C59.7302 22.5353 60.4058 22.7415 60.9874 23.1183C61.569 23.495 62.0335 24.0271 62.3281 24.6543ZM37.9688 32.8125V22.1884L49.8438 22.377V32.8125H37.9688ZM27.1856 23.6447C27.5305 23.15 27.9915 22.7474 28.5282 22.4723C29.0648 22.1971 29.6607 22.0578 30.2638 22.0665L35.7814 22.154V32.7959H20.8056L27.1856 23.6447ZM15.6817 57.9342C14.4622 57.9342 13.2701 57.5726 12.2562 56.8951C11.2422 56.2177 10.4519 55.2547 9.98517 54.1281C9.51847 53.0014 9.39635 51.7617 9.63424 50.5656C9.87213 49.3696 10.4593 48.2709 11.3216 47.4086C12.1839 46.5463 13.2826 45.959 14.4786 45.7211C15.6747 45.4832 16.9144 45.6053 18.0411 46.0719C19.1677 46.5386 20.1307 47.3289 20.8082 48.3429C21.4857 49.3568 21.8473 50.5489 21.8473 51.7684C21.8457 53.4031 21.1956 54.9705 20.0397 56.1264C18.8838 57.2824 17.3165 57.9325 15.6817 57.9342ZM65.0159 57.9342C63.7965 57.9342 62.6044 57.5726 61.5904 56.8951C60.5764 56.2177 59.7861 55.2547 59.3194 54.1281C58.8527 53.0014 58.7306 51.7617 58.9685 50.5656C59.2063 49.3696 59.7936 48.2709 60.6559 47.4086C61.5182 46.5463 62.6168 45.959 63.8128 45.7211C65.0089 45.4832 66.2486 45.6053 67.3753 46.0719C68.5019 46.5386 69.4649 47.3289 70.1424 48.3429C70.8199 49.3568 71.1816 50.5489 71.1816 51.7684C71.1797 53.4031 70.5295 54.9704 69.3736 56.1263C68.2176 57.2822 66.6504 57.9324 65.0156 57.9342H65.0159ZM76.875 47.6137C76.8705 48.5587 76.5052 49.4662 75.8538 50.1508C75.2024 50.8354 74.3142 51.2453 73.3706 51.2968C73.2551 49.165 72.3283 47.1581 70.7804 45.6877C69.2325 44.2173 67.1807 43.3948 65.0457 43.3888C62.9108 43.3828 60.8544 44.1938 59.2982 45.6555C57.7421 47.1172 56.8041 49.1188 56.6766 51.25H24.0211C23.9022 49.1186 22.9718 47.1137 21.4209 45.647C19.87 44.1802 17.8164 43.3629 15.6817 43.3629C13.5471 43.3629 11.4935 44.1802 9.94257 45.647C8.39169 47.1137 7.46125 49.1186 7.34234 51.25H3.125V43.6654C3.1327 42.1169 3.67227 40.6181 4.65333 39.42C5.63438 38.2219 6.99734 37.3973 8.51391 37.0843L18.8123 34.9832H67.6805L74.4486 36.8453C75.1566 37.1068 75.7681 37.5779 76.2016 38.1958C76.6351 38.8137 76.87 39.5491 76.875 40.3039V47.6137Z' />
  </svg>
)

export default CarIcon
