import type { FC, PropsWithChildren } from 'react';

import WithNavigation from '../with-navigation';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavigation />
    {children}
  </>
);

export default DefaultLayout;