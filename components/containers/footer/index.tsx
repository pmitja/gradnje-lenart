import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProtectedNadzornaPlosca } from '@/routes'
import { NavbarProps } from '@/types/general'

const Footer = ({ navItems }: NavbarProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-100 text-secondary-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex justify-center md:justify-start">
              <Image
                src="/gradnje-plus-logo.webp"
                alt="Gradnje Plus"
                width={200}
                height={100}
              />
            </div>
            <p className="mb-4 text-center text-secondary-200 md:text-left">
              Gradnje Plus je vodilno podjetje za gradnjo in prodajo nepremičnin z več kot 15 let
              izkušenj na slovenskem trgu.
            </p>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-secondary-200/10 hover:bg-secondary-200/20"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-secondary-200/10 hover:bg-secondary-200/20"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-center text-lg font-bold md:text-left">Navigacija</h3>
            <nav className="flex flex-wrap justify-center gap-4 md:flex-col md:justify-start md:gap-2">
              {navItems.map((navItem) => (
                <Link
                  href={navItem.link}
                  key={navItem.link}
                  className="hover:underline"
                >
                  {navItem.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-center text-lg font-bold md:text-left">Kontakt</h3>
            <ul className="space-y-3 text-center md:text-left">
              <li className="flex flex-col items-center md:flex-row md:items-start">
                <MapPin className="mb-1 size-5 md:mb-0 md:mr-2 md:mt-1 md:shrink-0" />
                <span>Ljubljanska cesta 25, 2230 Lenart v Slovenskih goricah</span>
              </li>
              <li className="flex flex-col items-center md:flex-row md:items-center">
                <Phone className="mb-1 size-5 md:mb-0 md:mr-2" />
                <span>+386 2 720 83 30</span>
              </li>
              <li className="flex flex-col items-center md:flex-row md:items-center">
                <Mail className="mb-1 size-5 md:mb-0 md:mr-2" />
                <span>info@gradnje-plus.si</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-center text-lg font-bold md:text-left">Ostanite obveščeni</h3>
            <p className="mb-4 text-center text-secondary-200 md:text-left">
              Prijavite se na naše e-novice in bodite prvi obveščeni o novih projektih.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Vaš email naslov"
                className="rounded-l-md bg-white/80 text-secondary-300"
                required
              />
              <Button
                type="submit"
                className="rounded-r-md bg-secondary-300 text-white hover:bg-secondary-400"
              >
                Prijava
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-secondary-200/10 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm md:text-left">
              © {currentYear} Gradnje plus d.o.o., vse pravice pridržane. Izdelava: Mipa solutions
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/politika-zasebnosti" className="text-sm hover:underline">
                Politika zasebnosti
              </Link>
              <ProtectedNadzornaPlosca.Link>
                <Button
                  variant="secondary"
                  size="sm"
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
