'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Public, PublicKontakt, PublicProjekti } from '@/routes'
import { NavbarProps } from '@/types/general'

const DesktopNavigation = ({ navItems }: NavbarProps) => {
  const pathname = usePathname()

  const [ scrolled, setScrolled ] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY

      if (offset > 48) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={cn(
      'fixed inset-x-0 top-[36px] z-[21470000] transition-all duration-300',
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent',
    )}>
      <div className='container mx-auto flex w-full justify-between py-5'>
        <aside className='flex max-w-[175px] items-center'>
          <Public.Link className='flex items-center gap-2'>
            <Image
              src={scrolled ? '/gradnje-logo.webp' : '/gradnje-logo-white.webp'}
              width={265}
              height={30}
              alt='Gradnje plus'
              className='max-h-[30px] object-contain transition-all duration-200 lg:max-h-[30px]'
            />
          </Public.Link>
        </aside>
        <nav className='absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] md:block'>
          <ul className='flex items-center justify-center gap-8 text-base font-semibold leading-5'>
            {navItems.map((navItem, index) => (
              <Link
                href={navItem.link}
                key={index}
                className={cn(
                  'transition-colors',
                  scrolled ? 'text-secondary-400 hover:text-secondary-500' : 'text-white hover:text-white/80',
                  pathname === `${navItem.link}` && 'border-b-2 border-primary-300',
                )}
              >
                {navItem.text}
              </Link>
            ))}
          </ul>
        </nav>
        <aside className='flex items-center gap-2'>
          <PublicKontakt.Link>
            <Button
              variant="ghost"
              className={cn(
                'transition-all',
                !scrolled && 'text-white hover:bg-white hover:text-black',
              )}
            >
              Kontakt
            </Button>
          </PublicKontakt.Link>
          <PublicProjekti.Link>
            <Button
              variant="primary"
              className={cn(
                'transition-all',
                !scrolled && 'border-white text-white hover:bg-white hover:text-black',
              )}
            >
              Projekti
            </Button>
          </PublicProjekti.Link>
        </aside>
      </div>
    </header>
  )
}

export default DesktopNavigation
