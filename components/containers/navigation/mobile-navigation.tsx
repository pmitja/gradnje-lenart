'use client'

import { ChevronRight, Home, MapPin, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Container } from '@/components/containers/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Public, PublicKontakt, PublicProjekti } from '@/routes'
import { NavbarProps } from '@/types/general'

type HamburgerButtonProps = {
  isOpen: boolean
  handleMenu: () => void
}

const HamburgerButton = ({ isOpen, handleMenu }: HamburgerButtonProps) => (
  <button
    className={cn(
      'group flex size-12 max-h-10 max-w-10 flex-col items-center justify-center transition-all duration-300',
      isOpen ? 'gap-0 rotate-90' : 'gap-[5px]',
    )}
    onClick={handleMenu}
    role='button'
    aria-label='Hamburger button'
  >
    <div
      className={cn(
        'h-[2px] w-6 transform rounded-full bg-secondary-300 transition duration-300',
        isOpen ? 'translate-y-[2px] rotate-45 bg-secondary-400' : 'group-hover:bg-primary-300',
      )}
    />
    <div
      className={cn(
        'h-[2px] w-6 transform rounded-full bg-secondary-300 transition duration-300',
        isOpen ? 'opacity-0' : 'group-hover:bg-primary-300',
      )}
    />
    <div
      className={cn(
        'h-[2px] w-6 transform rounded-full bg-secondary-300 transition duration-300',
        isOpen ? '-translate-y-[2px] -rotate-45 bg-secondary-400' : 'group-hover:bg-primary-300',
      )}
    />
  </button>
)

const MobileNavigation = ({ navItems }: NavbarProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const pathName = usePathname()

  const handleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  useEffect(() => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }, [ pathName ])

  return (
    <header>
      {/* Top info bar */}
      <div className="fixed inset-x-0 top-0 z-[21480000] flex h-[36px] items-center justify-between bg-primary-200 px-4 text-white">
        <a
          href="tel:+38641638451"
          className="flex items-center gap-1 text-xs"
        >
          <Phone className="size-3" /> 051 635 106
        </a>
        <div className="flex items-center gap-3">
          {/* Removed Facebook and Instagram icons */}
        </div>
      </div>

      {/* Header bar */}
      <nav
        className='fixed inset-x-0 top-[36px] z-[21470000] flex items-center justify-between bg-white p-4 shadow-sm'
        aria-label='Mobile Menu'
      >
        <Public.Link>
          <Image
            src='/gradnje-plus-logo.webp'
            alt='Gradnje plus'
            width={192}
            height={35}
            className='max-h-[30px] object-contain transition-transform duration-300 hover:scale-105'
          />
        </Public.Link>
        <HamburgerButton
          isOpen={isOpen}
          handleMenu={handleMenu}
        />
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[21460000] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={handleMenu}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <Container
        className={cn(
          'fixed right-0 top-[36px] z-[21465000] flex h-[calc(100dvh-36px)] w-[85%] max-w-[320px] flex-col bg-white shadow-xl transition-all duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role='navigation'
        aria-label='Mobile menu navigation'
      >
        <div className="flex h-[70px] items-center justify-between border-b border-gray-100 px-6">
          <h2 className="text-lg font-bold text-secondary-400">Menu</h2>
          <button
            className="group rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
            onClick={handleMenu}
            aria-label="Close menu"
          >
            <X className="size-5 text-secondary-300 transition-transform duration-200 group-hover:scale-110 group-hover:text-primary-300" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-auto p-6">
          <nav className="mb-8">
            <ul className="flex flex-col space-y-4">
              <li className="text-xs font-medium uppercase text-secondary-200">Navigation</li>
              {navItems.map((navItem, index) => (
                <li key={index} className="border-b border-gray-50 py-2">
                  <Link
                    href={navItem.link}
                    className={cn(
                      'group flex items-center justify-between py-1 text-base font-medium transition-all duration-300',
                      pathName === navItem.link
                        ? 'text-primary-300'
                        : 'text-secondary-300 hover:text-primary-300',
                    )}
                  >
                    <span>{navItem.text}</span>
                    <ChevronRight
                      className={cn(
                        'size-4 transition-transform duration-300',
                        pathName === navItem.link && 'text-primary-300',
                        'group-hover:translate-x-1 group-hover:text-primary-300',
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-4">
            <PublicKontakt.Link className="block">
              <Button
                variant="secondary"
                className="w-full justify-start rounded-xl bg-gray-50 py-3 text-secondary-300 hover:bg-gray-100 hover:text-primary-300"
              >
                <Phone className="mr-2 size-4" />
                Kontakt
              </Button>
            </PublicKontakt.Link>

            <PublicProjekti.Link className="block">
              <Button
                variant="primary"
                className="w-full justify-start rounded-xl bg-primary-300 py-3 text-white hover:bg-primary-200"
              >
                <Home className="mr-2 size-4" />
                Projekti
              </Button>
            </PublicProjekti.Link>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 text-xs text-secondary-200">
            <a href="tel:+38641638451" className="flex items-center hover:text-primary-300">
              <Phone className="mr-1 size-3" /> 051 635 106
            </a>
            <a href="#" className="flex items-center hover:text-primary-300">
              <MapPin className="mr-1 size-3" /> Partizanska 14
            </a>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default MobileNavigation
