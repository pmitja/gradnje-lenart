'use client'

import { Facebook, Instagram, Mail, MapPin, PhoneCall } from 'lucide-react'

import ContactForm from '../contact-form'

const ContactUs = () => (
  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
    <div className="overflow-hidden rounded-xl bg-primary-100 shadow-md">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-body-200">Kontaktni podatki</h2>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="flex size-8 items-center justify-center rounded-full bg-secondary-400 transition-colors hover:bg-secondary-500"
              aria-label="Facebook"
            >
              <Facebook size={18} className="stroke-white" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="flex size-8 items-center justify-center rounded-full bg-body-100 transition-colors hover:bg-gray-200"
              aria-label="Instagram"
            >
              <Instagram size={18} className="stroke-secondary-400" />
            </a>
          </div>
        </div>

        <p className="mb-6 text-secondary-400">Podatki za direktni kontakt.</p>

        <div className="space-y-5">
          <div className="group flex items-center text-secondary-400">
            <div className="mr-4 flex size-9 items-center justify-center rounded-full bg-white/50">
              <PhoneCall size={18} className="stroke-secondary-500" />
            </div>
            <a
              href="tel:+38641638451"
              target="_blank"
              className="font-medium transition-colors hover:text-body-200"
            >
              041 638 451
            </a>
          </div>

          <div className="group flex items-center text-secondary-400">
            <div className="mr-4 flex size-9 items-center justify-center rounded-full bg-white/50">
              <Mail size={18} className="stroke-secondary-500" />
            </div>
            <a
              href="mailto:info@gradnje-plus.si"
              target="_blank"
              className="font-medium transition-colors hover:text-body-200"
            >
              info@gradnje-plus.si
            </a>
          </div>

          <div className="group flex items-center text-secondary-400">
            <div className="mr-4 flex size-9 items-center justify-center rounded-full bg-white/50">
              <MapPin size={18} className="stroke-secondary-500" />
            </div>
            <a
              href="https://maps.app.goo.gl/wi5XsLVuh6c7kTnv9"
              target="_blank"
              className="font-medium transition-colors hover:text-body-200"
            >
              Partizanska cesta 14, 2230 Lenart v Slov. goricah
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="p-6">
        <ContactForm />
      </div>
    </div>
  </div>
)

export default ContactUs
