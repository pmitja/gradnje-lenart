import { Mail, Phone } from 'lucide-react'

export default function Banner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[21460000] w-full border-b border-primary-400 bg-primary-300 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-6 py-2.5 text-sm sm:justify-end">
          <a
            href="tel:+38641638451"
            className="group flex items-center space-x-2 transition-colors hover:text-body-100"
          >
            <Phone className="size-4 transition-colors group-hover:text-body-100" />
            <span className="sr-only">Telefon:</span>
            <span className="font-medium">041 638 451</span>
          </a>

          <div className="h-4 w-px bg-primary-400" aria-hidden="true" />

          <a
            href="mailto:info@gradnjeplus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 transition-colors hover:text-body-100"
          >
            <Mail className="size-4 transition-colors group-hover:text-body-100" />
            <span className="sr-only">Email:</span>
            <span className="font-medium">info@gradnjeplus.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}
