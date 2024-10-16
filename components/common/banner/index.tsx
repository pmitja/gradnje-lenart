import { Mail, Phone } from 'lucide-react'

export default function Banner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[21470001] w-full bg-primary-100 text-secondary-400">
      <div className="container mx-auto py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center space-x-2 transition-colors hover:text-body-200 sm:mb-0">
            <Phone className="size-4" />
            <span className="sr-only">Telefon:</span>
            <a href="tel:+38641638451">
              041 638 451
            </a>
          </div>
          <div className="flex items-center space-x-2 transition-colors hover:text-body-200">
            <Mail className="size-4" />
            <span className="sr-only">Email:</span>
            <a href="mailto:info@gradnje-plus.si" target="_blank">
              info@gradnje-plus.si
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
