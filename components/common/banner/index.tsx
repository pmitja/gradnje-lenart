import { Mail, Phone } from 'lucide-react'

export default function Banner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[21470001] w-full border-b border-primary-200 bg-primary-100 text-secondary-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-6 py-2.5 text-sm sm:justify-end">
          <a
            href="tel:+38641638451"
            className="group flex items-center space-x-2 transition-colors hover:text-body-200"
          >
            <Phone className="size-4 transition-colors group-hover:text-body-200" />
            <span className="sr-only">Telefon:</span>
            <span className="font-medium">041 638 451</span>
          </a>

          <div className="h-4 w-px bg-primary-200" aria-hidden="true" />

          <a
            href="mailto:info@gradnje-plus.si"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 transition-colors hover:text-body-200"
          >
            <Mail className="size-4 transition-colors group-hover:text-body-200" />
            <span className="sr-only">Email:</span>
            <span className="font-medium">info@gradnje-plus.si</span>
          </a>
        </div>
      </div>
    </div>
  )
}
