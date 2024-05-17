import type { FC, PropsWithChildren } from 'react';


import type { Layouts } from '@/types/layouts';
import DefaultLayout from '@/components/layouts/default';
import HomeLayout from '@/components/layouts/home';
import CenteredLayout from './layouts/centered';

const layouts = {
  home: HomeLayout,
  page: DefaultLayout,
  centered: CenteredLayout,
} satisfies Record<Layouts, FC>;

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;