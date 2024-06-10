import type { FC, PropsWithChildren } from 'react';
import WithNavigation from '../with-navigation';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div
      className={
        'container mx-auto flex w-full min-w-0 justify-center lg:mt-[85px] mt-[80px] gap-16 md:gap-20 lg:gap-36 flex-col'
      }>
        <WithNavigation />
      {children}
    </div>
  </>
);

export default CenteredLayout;