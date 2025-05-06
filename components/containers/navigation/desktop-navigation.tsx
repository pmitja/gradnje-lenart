'use client'

import { MapPin, Phone } from 'lucide-react'
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

  const [ hoveredItem, setHoveredItem ] = useState<string | null>(null)

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
    <>
      {/* Top info bar */}
      <div className={cn(
        'fixed inset-x-0 top-0 z-[21480000] h-[36px] transition-all duration-300',
        'bg-primary-300 text-white',
      )}>
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:+38641638451"
              className="flex items-center gap-1 text-xs transition-all duration-300 hover:opacity-80"
            >
              <Phone className="size-3" /> 041 638 451
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-xs transition-all duration-300 hover:opacity-80"
            >
              <MapPin className="size-3" /> Partizanska cesta 14, 2230 Lenart
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex size-6 items-center justify-center rounded-full bg-white/10 text-xs transition-all duration-300 hover:bg-white/20"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex size-6 items-center justify-center rounded-full bg-white/10 text-xs transition-all duration-300 hover:bg-white/20"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className={cn(
        'fixed inset-x-0 top-[36px] z-[21470000] transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent',
      )}>
        <div className='container mx-auto flex h-20 w-full items-center justify-between px-4'>
          <div className='flex items-center'>
            <Public.Link className='group flex items-center transition-all duration-300 hover:opacity-90'>
              <Image
                src={scrolled ? '/gradnje-logo.webp' : '/gradnje-logo-white.webp'}
                width={265}
                height={30}
                alt='Gradnje plus'
                className='size-auto max-h-[38px] object-contain transition-all duration-300 lg:max-h-[38px]'
              />
            </Public.Link>
          </div>

          <nav className='flex h-full items-center'>
            <ul className='flex h-full items-center justify-center gap-8 px-6'>
              {navItems.map((navItem) => (
                <li
                  key={navItem.link}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => setHoveredItem(navItem.link)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={navItem.link}
                    className={cn(
                      'flex h-full items-center px-2 text-base font-semibold leading-5 transition-all duration-300',
                      scrolled
                        ? 'text-secondary-400 hover:text-primary-300'
                        : 'text-white hover:text-primary-100',
                      pathname === navItem.link && 'text-primary-300',
                    )}
                  >
                    {navItem.text}
                  </Link>

                  {/* Active indicator */}
                  <div className={cn(
                    'absolute bottom-0 left-0 h-1 w-full origin-center scale-x-0 bg-primary-300 transition-transform duration-300',
                    (pathname === navItem.link || hoveredItem === navItem.link) && 'scale-x-100',
                  )} />
                </li>
              ))}
            </ul>

            <div className='flex items-center gap-3'>
              <PublicKontakt.Link>
                <Button
                  variant={scrolled ? 'ghost' : 'secondary'}
                  className={cn(
                    'h-11 rounded-full transition-all duration-300 hover:bg-opacity-90',
                    !scrolled && 'border-white bg-white/10 text-white hover:bg-white/30',
                  )}
                >
                  <Phone className="mr-2 size-4" />
                  Kontakt
                </Button>
              </PublicKontakt.Link>

              <PublicProjekti.Link>
                <Button
                  variant="primary"
                  className={cn(
                    'h-11 rounded-full shadow-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg',
                    !scrolled && 'border-primary-200 bg-primary-300/90 text-white hover:bg-primary-300',
                  )}
                >
                  Projekti
                </Button>
              </PublicProjekti.Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default DesktopNavigation
