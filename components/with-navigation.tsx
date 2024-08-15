'use client'

import { useState, type FC, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import MobileNavigation from './containers/navigation/mobile-navigation'
import DesktopNavigation from '@/components/containers/navigation/desktop-navigation'

const navItems = [
  {
    text: 'Projekti',
    link: '/projekti'
  },
  {
    text: 'Podjetje',
    link: '/podjetje'
  },
  {
    text: 'Reference',
    link: '/reference'
  },
  {
    text: 'Kontakt',
    link: '/kontakt'
  },
  {
    text: 'Blog',
    link: '/blog'
  }
]

const WithNavigation: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1120px)')

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {!isDesktop && isMounted && (
        <>
          <MobileNavigation navItems={navItems} />
        </>
      )}
      {isDesktop && isMounted && (
        <>
          <DesktopNavigation navItems={navItems} />
        </>
      )}
    </>
  )
}

export default WithNavigation
