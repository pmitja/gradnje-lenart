import type { FC, PropsWithChildren } from 'react';

import WithNavigation from '@/components/with-navigation';

import styles from './layouts.module.css';

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavigation />
  
    <div
      className={
        'container mx-auto flex w-full min-w-0 items-center justify-center h-full'
      }>
      {children}
    </div>
  </>
);

export default CenteredLayout;
