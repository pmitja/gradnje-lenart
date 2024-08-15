'use client'

import { type FC } from 'react'
import Footer from './containers/footer'

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

const WithFooter: FC = () => {
  return <Footer navItems={navItems} />
}

export default WithFooter
