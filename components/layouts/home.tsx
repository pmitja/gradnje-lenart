import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';
import CenteredLayout from './centered';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <CenteredLayout>
    <main className={''}>{children}</main>
  </CenteredLayout>
);

export default HomeLayout;
