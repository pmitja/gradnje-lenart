'use client'

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {
    icon: Facebook, href: 'https://facebook.com', label: 'Facebook',
  },
  {
    icon: Instagram, href: 'https://instagram.com', label: 'Instagram',
  },
]

const quickLinks = [
  {
    label: 'Domov', href: '/',
  },
  {
    label: 'O nas', href: '/o-nas',
  },
  {
    label: 'Nepremičnine', href: '/nepremicnine',
  },
  {
    label: 'Projekti', href: '/projekti',
  },
  {
    label: 'Kontakt', href: '/kontakt',
  },
]

const legalLinks = [
  {
    label: 'Pogoji poslovanja', href: '/pogoji-poslovanja',
  },
  {
    label: 'Politika zasebnosti', href: '/politika-zasebnosti',
  },
  {
    label: 'Piškotki', href: '/piskotki',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-300 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/gradnje-plus-logo-card.webp"
                alt="Gradnje Lenart"
                width={180}
                height={60}
                className="rounded bg-white p-2"
              />
            </div>
            <p className="mb-4 text-gray-200">
              Gradnje Lenart je vodilno podjetje za gradnjo in prodajo nepremičnin
              v Slovenskih goricah.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Hitre povezave</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 size-5 shrink-0" />
                <span>
                  Ljubljanska cesta 25,
                  <br />
                  2230 Lenart v Slovenskih goricah
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 size-5" />
                <span>+386 2 720 83 30</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 size-5" />
                <span>info@gradnje-lenart.si</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm">Delovni čas: Pon-Pet, 8:00 - 16:00</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center text-sm text-gray-300 md:text-left">
              &copy; {currentYear} Gradnje Lenart. Vse pravice pridržane.
            </div>
            <div className="flex space-x-4 text-sm text-gray-300">
              {legalLinks.map((link, i) => (
                <Link key={i} href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
