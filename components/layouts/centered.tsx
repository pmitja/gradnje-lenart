import type { FC, PropsWithChildren } from 'react';
import WithNavigation from '../with-navigation';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div
      className={
        'container mx-auto flex w-full min-w-0 items-center justify-center h-full'
      }>
        <WithNavigation />
      {children}
    </div>
  </>
);

export default CenteredLayout;
