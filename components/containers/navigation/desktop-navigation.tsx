'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NavbarProps } from '@/types/general'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DesktopNavigation = ({ navItems }: NavbarProps) => {
  const pathname = usePathname()
  return (
    <div className='fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-body-75 py-5'>
      <div className='container mx-auto flex w-full justify-between'>
        <aside>
          <Link
            href={'/'}
            className='flex items-center gap-2'
          >
            <Image
              src={'/gradnje-plus-logo.webp'}
              width={265}
              height={50}
              alt='Gradnje plus'
              className='max-h-[35px] md:max-w-[193px] lg:max-h-[45px] lg:max-w-[265px]'
            />
          </Link>
        </aside>
        <nav className='absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block'>
          <ul className='flex items-center justify-center gap-8 text-base font-semibold leading-5 text-secondary-300 lg:text-lg lg:leading-6'>
            {navItems.map((navItem, index) => (
              <Link
                href={navItem.link}
                key={index}
                className={cn(
                  '',
                  pathname === `${navItem.link}` && 'border-b-2 border-primary-300'
                )}
              >
                {navItem.text}
              </Link>
            ))}
          </ul>
        </nav>
        <aside className='flex items-center gap-2'>
          <Button variant='secondary'>FAQ</Button>
          <Button variant='primary'>Kontakt</Button>
        </aside>
      </div>
    </div>
  )
}

export default DesktopNavigation
