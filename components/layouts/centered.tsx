import type { FC, PropsWithChildren } from 'react';

import WithNavigation from '@/components/with-navigation';

import styles from './layouts.module.css';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavigation />
  
    <div
      className={
        'container mx-auto flex w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28 h-full'
      }>
      {children}
    </div>
  </>
);

export default CenteredLayout;
