import { Facebook, Instagram, Mail, MapPin, PhoneCall } from 'lucide-react'

import ContactForm from '../contact-form'

const ContactUs = () => (
  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
    <div className="bg-pattern rounded-xl bg-primary-200 p-6">
      <div className="flex justify-between">
        <p className="mb-3 md:text-3xl text-2xl font-bold text-body-200">Kontaktni podatki</p>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="flex size-7 items-center justify-center rounded-full bg-secondary-400"
          >
            <Facebook size={18} className="stroke-white" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="flex size-7 items-center justify-center rounded-full bg-body-100"
          >
            <Instagram size={18} className="stroke-secondary-400" />
          </a>
        </div>
      </div>
      <p className="mb-5 text-secondary-400">Podatki za direktni kontakt.</p>
      <div className="mb-5 text-secondary-400">
        <PhoneCall size={18} className="mr-8 inline-block" />
        <a href="tel:+38640123456" target="_blank">
          +386 40 123 456
        </a>
      </div>
      <div className="mb-5 text-secondary-400">
        <Mail size={18} className="mr-8 inline-block" />
        <a href="mailto:info@gradnje-plus.si" target="_blank">
          info@gradnje-plus.si
        </a>
      </div>
      <div className="text-secondary-400">
        <MapPin size={18} className="mr-8 inline-block" />
        <a href="https://maps.app.goo.gl/wi5XsLVuh6c7kTnv9" target="_blank">
          Partizanska cesta 14, 2230 Lenart v Slov. goricah
        </a>
      </div>
    </div>
    <ContactForm />
  </div>
)

export default ContactUs
