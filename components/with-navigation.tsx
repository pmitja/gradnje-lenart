'use client'

import { type FC, useEffect, useState } from 'react'

import Banner from '@/components/common/banner'
import DesktopNavigation from '@/components/containers/navigation/desktop-navigation'
import MobileNavigation from '@/components/containers/navigation/mobile-navigation'
import { useMediaQuery } from '@/hooks/use-media-query'

const navItems = [
  {
    text: 'Projekti',
    link: '/projekti',
  },
  {
    text: 'Podjetje',
    link: '/podjetje',
  },
  {
    text: 'Reference',
    link: '/reference',
  },
]

const WithNavigation: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1120px)')

  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {!isDesktop && isMounted && (
        <>
          <Banner />
          <MobileNavigation navItems={navItems} />
        </>
      )}
      {isDesktop && isMounted && (
        <>
          <Banner />
          <DesktopNavigation navItems={navItems} />
        </>
      )}
    </>
  )
}

export default WithNavigation
