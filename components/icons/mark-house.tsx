import type { FC, SVGProps } from 'react';

const MarkHouseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 70 70"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M66.5564 49.688C66.4235 49.43 66.3541 49.144 66.3541 48.8538C66.3541 48.5636 66.4235 48.2775 66.5564 48.0196C67.0683 47.0294 67.2131 45.89 66.965 44.8033C66.717 43.7166 66.0922 42.7529 65.2013 42.083C64.9747 41.9111 64.791 41.6891 64.6646 41.4343C64.5382 41.1796 64.4726 40.899 64.4729 40.6146V40.4396C64.4706 39.346 64.0905 38.2868 63.3971 37.4412C62.7037 36.5956 61.7394 36.0155 60.6675 35.799C60.6043 35.782 60.5422 35.7615 60.4813 35.7376L61.6929 18.7012L64.9979 20.2749C65.3466 20.4379 65.7457 20.4564 66.108 20.3264C66.4703 20.1964 66.7666 19.9284 66.9321 19.5809C67.0976 19.2333 67.119 18.8345 66.9916 18.4712C66.8642 18.1079 66.5984 17.8098 66.2521 17.6417L61.0538 15.1667L61.0477 15.1637L35.6271 3.0584C35.4314 2.96487 35.2173 2.91632 35.0004 2.91632C34.7835 2.91632 34.5694 2.96487 34.3738 3.0584L8.95049 15.1642L8.94685 15.1667L3.74789 17.6417C3.40155 17.8098 3.1357 18.1079 3.00831 18.4712C2.88093 18.8345 2.90233 19.2333 3.06786 19.5809C3.2334 19.9284 3.52963 20.1964 3.89196 20.3264C4.25429 20.4564 4.65333 20.4379 5.00206 20.2749L8.30737 18.7009L11.1357 58.3333H10.2083C9.82153 58.3333 9.4506 58.487 9.17711 58.7605C8.90362 59.0339 8.74997 59.4049 8.74997 59.7917V65.625C8.74997 66.0118 8.90362 66.3827 9.17711 66.6562C9.4506 66.9297 9.82153 67.0833 10.2083 67.0833H59.7916C60.1784 67.0833 60.5494 66.9297 60.8228 66.6562C61.0963 66.3827 61.25 66.0118 61.25 65.625V61.7379C62.1865 61.4227 63.0009 60.8222 63.5789 60.0207C64.1569 59.2192 64.4695 58.2569 64.4729 57.2687V57.0937C64.4715 56.8134 64.5347 56.5364 64.6576 56.2844C64.7804 56.0324 64.9596 55.812 65.1814 55.6404C66.079 54.9724 66.71 54.0073 66.962 52.9173C67.214 51.8272 67.0698 50.6821 66.5564 49.688ZM11.1358 17.3542L35 5.98994L58.8644 17.3542L57.7646 32.8271C56.9754 32.2691 56.0331 31.9686 55.0666 31.9667C54.6657 31.9636 54.2661 32.0131 53.8781 32.1141C53.5942 32.1874 53.2968 32.1913 53.011 32.1253C52.7253 32.0593 52.4597 31.9254 52.2367 31.7349C51.3734 31.0383 50.297 30.6594 49.1876 30.6616C48.0783 30.6638 47.0034 31.047 46.1428 31.747C45.9202 31.9276 45.6593 32.0549 45.3801 32.1192C45.1008 32.1835 44.8105 32.1831 44.5313 32.118C44.175 32.0296 43.8095 31.9838 43.4424 31.9815C44.7798 30.0347 45.4089 27.688 45.2248 25.3333C45.0407 22.9785 44.0545 20.7581 42.4308 19.0428C40.807 17.3275 38.6441 16.221 36.3029 15.9081C33.9618 15.5952 31.5842 16.0948 29.567 17.3234C27.5497 18.5521 26.015 20.4355 25.2189 22.6592C24.4228 24.8829 24.4135 27.3125 25.1927 29.5422C25.9718 31.7719 27.4922 33.667 29.5 34.911C31.5078 36.1549 33.8815 36.6726 36.225 36.3775C35.5202 36.7963 34.936 37.3906 34.5296 38.1026C34.1232 38.8146 33.9084 39.6198 33.9062 40.4396V40.6583C33.9065 40.9321 33.8427 41.2022 33.7199 41.4468C33.5971 41.6916 33.4188 41.9041 33.1991 42.0675C32.5978 42.517 32.1133 43.1044 31.7864 43.7802C30.6828 43.8533 29.6481 44.3425 28.8912 45.1489C28.1342 45.9554 27.7115 47.019 27.7083 48.125V58.3333H14.0601L11.1358 17.3542ZM35 33.5417C33.5578 33.5417 32.1481 33.114 30.9489 32.3128C29.7498 31.5116 28.8152 30.3728 28.2634 29.0404C27.7115 27.708 27.5671 26.2419 27.8484 24.8275C28.1298 23.413 28.8242 22.1138 29.844 21.094C30.8637 20.0742 32.163 19.3798 33.5774 19.0984C34.9919 18.8171 36.458 18.9615 37.7904 19.5134C39.1228 20.0653 40.2616 20.9998 41.0628 22.199C41.864 23.3981 42.2916 24.8078 42.2916 26.25C42.2894 28.1832 41.5204 30.0365 40.1534 31.4035C38.7865 32.7704 36.9331 33.5394 35 33.5417ZM34.0245 58.3268V58.3333H30.625V48.125C30.6251 47.8591 30.6979 47.5983 30.8355 47.3708C30.973 47.1433 31.1701 46.9576 31.4055 46.8339C31.4096 46.8524 31.4201 46.8686 31.4246 46.8872C31.5107 47.2691 31.6436 47.639 31.8205 47.9883C31.9583 48.2566 32.0331 48.5527 32.0393 48.8542C32.0346 49.144 31.9653 49.4291 31.8364 49.6888C31.4855 50.3636 31.3002 51.1123 31.2958 51.8729C31.2981 52.6043 31.4706 53.3251 31.7996 53.9783C32.1287 54.6315 32.6052 55.1992 33.1916 55.6363C33.4133 55.7995 33.5935 56.0126 33.7176 56.2584C33.8417 56.5041 33.9063 56.7756 33.9062 57.0509V57.2696C33.9063 57.6253 33.946 57.9799 34.0245 58.3268ZM11.6666 64.1667V61.25H36.0873C36.206 61.3271 36.3338 61.3774 36.4567 61.4425C36.5508 61.4924 36.6423 61.5466 36.7387 61.5893C37.0527 61.7337 37.3825 61.8404 37.7215 61.9073C38.0044 61.9645 38.2696 62.0885 38.4949 62.269C38.7202 62.4495 38.8991 62.6811 39.0168 62.9447C39.1132 63.1627 39.2262 63.3729 39.3549 63.5736C39.3938 63.6348 39.4413 63.6885 39.483 63.7474C39.5739 63.8809 39.6717 64.0096 39.7759 64.133C39.7852 64.1435 39.7922 64.1562 39.8015 64.1667H11.6666ZM63.9644 51.0239C64.1628 51.4067 64.2175 51.848 64.1185 52.2678C64.0195 52.6875 63.7734 53.0579 63.4248 53.3117C62.8422 53.7548 62.3703 54.327 62.0461 54.9832C61.7219 55.6394 61.5542 56.3618 61.5562 57.0937V57.2687C61.5546 57.6905 61.4069 58.0986 61.1381 58.4237C60.8693 58.7487 60.4961 58.9704 60.0821 59.0511C59.7978 59.1077 59.5204 59.1949 59.2547 59.311C58.1094 59.7614 57.1884 60.6459 56.692 61.7719C56.5153 62.1557 56.2099 62.4656 55.8287 62.648C55.4476 62.8303 55.0146 62.8736 54.6049 62.7703C53.8731 62.5892 53.1091 62.5818 52.374 62.7486C51.6388 62.9154 50.9528 63.2518 50.3708 63.7309C50.0419 64.0002 49.6304 64.1482 49.2053 64.1501C48.7802 64.152 48.3674 64.0078 48.036 63.7416C47.181 63.0165 46.096 62.6193 44.975 62.6208C44.5739 62.6175 44.1742 62.6681 43.7866 62.7712C43.3733 62.8741 42.9371 62.8296 42.5532 62.6454C42.1692 62.4612 41.8615 62.1488 41.6831 61.7622C41.3731 61.0686 40.9011 60.4596 40.3068 59.9863C39.7125 59.5131 39.0133 59.1895 38.268 59.0427C37.9743 58.985 37.7008 58.8514 37.4748 58.6553C37.2688 58.4881 37.1032 58.2766 36.9903 58.0366C36.8774 57.7965 36.8202 57.534 36.8229 57.2687V57.05C36.8246 56.3204 36.6546 55.6006 36.3269 54.9487C35.9991 54.2969 35.5226 53.7312 34.936 53.2974C34.713 53.1325 34.5315 52.9179 34.406 52.6706C34.2804 52.4233 34.2141 52.1502 34.2125 51.8729C34.2182 51.5654 34.2978 51.2638 34.4445 50.9935C34.7832 50.3253 34.9585 49.5861 34.9558 48.8369C34.953 48.0877 34.7725 47.3498 34.4289 46.684C34.2906 46.4223 34.2164 46.1314 34.2125 45.8354C34.2114 45.7737 34.2158 45.712 34.2257 45.6511C34.2989 45.1607 34.5546 44.7161 34.9416 44.4062C35.5268 43.9725 36.002 43.4074 36.3287 42.7564C36.6555 42.1054 36.8248 41.3867 36.8229 40.6583V40.4396C36.82 40.0189 36.9648 39.6105 37.2321 39.2856C37.4993 38.9607 37.8721 38.7398 38.2855 38.6614C39.0291 38.5128 39.7262 38.1878 40.3181 37.7137C40.9101 37.2396 41.3795 36.6303 41.687 35.9371C41.8287 35.6213 42.0591 35.3535 42.3503 35.1663C42.6416 34.9792 42.9809 34.8809 43.3271 34.8833C43.476 34.8812 43.6245 34.8979 43.7692 34.9332C44.5067 35.1138 45.2761 35.1204 46.0166 34.9526C46.7571 34.7847 47.4484 34.447 48.036 33.9662C48.3662 33.7049 48.7748 33.5626 49.1958 33.5623C49.6169 33.5621 50.0257 33.7038 50.3562 33.9646C50.9351 34.4556 51.6235 34.8003 52.3634 34.9697C53.1034 35.1391 53.8732 35.1281 54.608 34.9379C55.0205 34.8346 55.4562 34.8799 55.8387 35.0658C56.2211 35.2518 56.5259 35.5665 56.6994 35.9548C56.9707 36.5438 57.362 37.0696 57.8483 37.4987C57.8614 37.5143 57.8774 37.5264 57.8906 37.5416C57.9412 37.5853 57.9826 37.6469 58.0345 37.6874C58.1013 37.7422 58.1831 37.7749 58.2532 37.8255C58.276 37.8382 58.2948 37.8547 58.3183 37.8665C58.8502 38.2547 59.4584 38.5257 60.1027 38.6616C60.5128 38.7454 60.8814 38.9682 61.1462 39.2923C61.411 39.6165 61.5558 40.0222 61.5561 40.4407V40.6157C61.555 41.3515 61.725 42.0774 62.0526 42.7362C62.3802 43.395 62.8564 43.9686 63.4437 44.4118C63.7859 44.6676 64.026 45.0367 64.1212 45.4532C64.2164 45.8696 64.1605 46.3064 63.9635 46.6855C63.6176 47.3564 63.4372 48.1004 63.4373 48.8553C63.4375 49.6101 63.6183 50.353 63.9644 51.0239Z" />
    <path d="M54.9873 44.2057H53.2957C53.2058 44.2058 53.1182 44.1774 53.0456 44.1245C52.9729 44.0717 52.9189 43.9971 52.8913 43.9116L52.3686 42.303C52.1505 41.6318 51.7254 41.0468 51.1544 40.6319C50.5834 40.2171 49.8957 39.9937 49.1899 39.9937C48.4841 39.9937 47.7964 40.2171 47.2254 40.6319C46.6543 41.0468 46.2293 41.6318 46.0112 42.303L45.4885 43.9116C45.461 43.9972 45.407 44.0718 45.3343 44.1246C45.2616 44.1775 45.174 44.2059 45.0841 44.2057H43.3924C42.6866 44.2058 41.9989 44.4292 41.4279 44.8441C40.8569 45.2589 40.4319 45.8439 40.2138 46.5152C39.9957 47.1864 39.9956 47.9095 40.2137 48.5808C40.4318 49.2521 40.8568 49.8371 41.4278 50.252L42.7971 51.2467C42.8698 51.2995 42.9238 51.3741 42.9515 51.4595C42.9791 51.545 42.9789 51.637 42.951 51.7224L42.4283 53.331C42.2023 54.0016 42.1983 54.7273 42.4169 55.4004C42.6356 56.0735 43.0653 56.6582 43.6424 57.0679C44.2104 57.4901 44.8993 57.7181 45.607 57.7181C46.3147 57.7181 47.0036 57.4901 47.5716 57.0679L48.9402 56.0732C49.0127 56.0201 49.1003 55.9914 49.1902 55.9914C49.2801 55.9914 49.3676 56.0201 49.4401 56.0732L50.8094 57.0672C51.3803 57.4816 52.0678 57.7047 52.7733 57.7045C53.4788 57.7044 54.1661 57.4809 54.7369 57.0662C55.3076 56.6516 55.7325 56.0669 55.9507 55.396C56.1689 54.7251 56.1691 54.0023 55.9515 53.3313L55.4288 51.7227C55.4006 51.6373 55.4004 51.5451 55.4282 51.4596C55.456 51.374 55.5104 51.2996 55.5834 51.247L56.9511 50.2523C57.5223 49.8375 57.9474 49.2526 58.1656 48.5813C58.3838 47.9101 58.3839 47.187 58.1659 46.5157C57.9479 45.8444 57.5229 45.2593 56.9519 44.8444C56.3809 44.4295 55.6932 44.2057 54.9873 44.2057ZM55.2373 47.8917L53.8694 48.8865C53.2971 49.3004 52.871 49.8853 52.6527 50.557C52.4344 51.2286 52.435 51.9523 52.6546 52.6235L53.1773 54.2321C53.2111 54.3169 53.2142 54.4108 53.1861 54.4977C53.158 54.5845 53.1005 54.6588 53.0234 54.7078C52.9526 54.7652 52.8642 54.7966 52.7731 54.7966C52.6819 54.7966 52.5935 54.7652 52.5228 54.7078L51.1541 53.7144C50.5838 53.2977 49.8958 53.0732 49.1895 53.0732C48.4832 53.0732 47.7953 53.2977 47.2249 53.7144L45.8563 54.7085C45.7836 54.7613 45.6961 54.7898 45.6062 54.7898C45.5164 54.7898 45.4289 54.7613 45.3562 54.7085C45.2835 54.6556 45.2295 54.5812 45.2018 54.4957C45.174 54.4103 45.1741 54.3182 45.2019 54.2328L45.7246 52.6243C45.9441 51.9531 45.9448 51.2295 45.7266 50.5579C45.5084 49.8863 45.0826 49.3013 44.5105 48.8873L43.1412 47.8924C43.0639 47.8437 43.0062 47.7694 42.9779 47.6825C42.9497 47.5957 42.9528 47.5017 42.9867 47.4168C43.0103 47.3288 43.0634 47.2515 43.1371 47.1979C43.2109 47.1444 43.3008 47.1178 43.3918 47.1227H45.0835C45.7897 47.1242 46.4782 46.9014 47.0496 46.4863C47.6209 46.0713 48.0457 45.4855 48.2627 44.8134L48.7854 43.2049C48.8134 43.1197 48.8676 43.0456 48.9402 42.9931C49.0128 42.9405 49.1002 42.9122 49.1898 42.9122C49.2795 42.9122 49.3668 42.9405 49.4394 42.9931C49.5121 43.0456 49.5662 43.1197 49.5943 43.2049L50.1177 44.8141C50.3349 45.4858 50.7596 46.0711 51.3307 46.486C51.9018 46.9009 52.5898 47.1238 53.2957 47.1227H54.9873C55.0784 47.1178 55.1683 47.1444 55.242 47.198C55.3158 47.2515 55.3689 47.3288 55.3925 47.4168C55.4262 47.5016 55.4292 47.5956 55.4008 47.6823C55.3725 47.7691 55.3146 47.8432 55.2373 47.8917Z" />
  </svg>
);

export default MarkHouseIcon;