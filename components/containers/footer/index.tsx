import { ArrowUp, ChevronRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ProtectedNadzornaPlosca } from '@/routes'
import { NavbarProps } from '@/types/general'

const Footer = ({ navItems }: NavbarProps) => {
  const currentYear = new Date().getFullYear()

  const [ showScrollTop, setShowScrollTop ] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, behavior: 'smooth',
    })
  }

  return (
    <footer className="relative bg-gradient-to-b from-primary-50 to-primary-100 text-secondary-300">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full bg-primary-300 text-white shadow-lg transition-all duration-300 hover:bg-primary-400 ${
          showScrollTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-5" />
      </button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-6 transition-transform duration-300 hover:scale-105">
              <Image
                src="/gradnje-plus-logo.webp"
                alt="Gradnje Plus"
                width={200}
                height={100}
                className="rounded-md drop-shadow-sm"
              />
            </div>
            <p className="mb-6 leading-relaxed text-secondary-300">
              Gradnje Plus je vodilno podjetje za gradnjo in prodajo nepremičnin z več kot 15 let
              izkušenj na slovenskem trgu.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="group flex size-10 items-center justify-center rounded-full bg-secondary-200/10 transition-all duration-300 hover:bg-primary-300 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="size-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="#"
                className="group flex size-10 items-center justify-center rounded-full bg-secondary-200/10 transition-all duration-300 hover:bg-primary-300 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="size-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 text-lg font-bold text-secondary-400">Navigacija</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map((navItem) => (
                <Link
                  href={navItem.link}
                  key={navItem.link}
                  className="group flex items-center text-secondary-300 transition-colors duration-300 hover:text-primary-300"
                >
                  <ChevronRight className="mr-2 size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    {navItem.text}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 text-lg font-bold text-secondary-400">Kontakt</h3>
            <ul className="space-y-4">
              <li className="group flex items-start">
                <MapPin className="mr-3 mt-1 size-5 shrink-0 text-primary-300" />
                <span className="transition-all duration-300 group-hover:translate-x-1">
                  Partizanska cesta 14, 2230 Lenart v Slovenskih goricah
                </span>
              </li>
              <li className="group flex items-center">
                <Phone className="mr-3 size-5 shrink-0 text-primary-300" />
                <a
                  href="tel:+38641638451"
                  className="transition-all duration-300 hover:text-primary-300 group-hover:translate-x-1"
                >
                  041 638 451
                </a>
              </li>
              <li className="group flex items-center">
                <Mail className="mr-3 size-5 shrink-0 text-primary-300" />
                <a
                  href="mailto:info@gradnje-plus.si"
                  className="transition-all duration-300 hover:text-primary-300 group-hover:translate-x-1"
                >
                  info@gradnje-plus.si
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-secondary-200/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm text-secondary-300 md:text-left">
              © {currentYear} Gradnje plus d.o.o., vse pravice pridržane. Izdelava:
              <a href="https://mipa.si" className="ml-1 text-primary-300 hover:underline">Mipa solutions</a>
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/politika-zasebnosti"
                className="text-sm text-secondary-300 transition-colors duration-300 hover:text-primary-300 hover:underline"
              >
                Politika zasebnosti
              </Link>
              <ProtectedNadzornaPlosca.Link>
                <Button
                  variant="secondary"
                  size="sm"
                  className="transition-transform duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/nadzorna-plosca">Nadzorna plošča</Link>
                </Button>
              </ProtectedNadzornaPlosca.Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
