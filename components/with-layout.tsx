import type { FC, PropsWithChildren } from 'react'

import type { Layouts } from '@/types/layouts'

import CenteredLayout from './layouts/centered'
import WithFooter from './with-footer'
import WithNavigation from './with-navigation'

const layouts = {
  centered: CenteredLayout,
} satisfies Record<Layouts, FC>

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? CenteredLayout

  return (
    <>
      <WithNavigation />
      <LayoutComponent>{children}</LayoutComponent>
      <WithFooter />
    </>
  )
}

export default WithLayout
