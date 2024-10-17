'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NavbarProps } from '@/types/general'

const DesktopNavigation = ({ navItems }: NavbarProps) => {
  const pathname = usePathname()

  return (
    <header className='fixed inset-x-0 top-[36px] z-10 flex items-center justify-between bg-body-75 py-5'>
      <div className='container mx-auto flex w-full justify-between'>
        <aside className='flex max-w-[175px] items-center'>
          <Link
            href={'/'}
            className='flex items-center gap-2'
          >
            <Image
              src={'/gradnje-plus-logo.webp'}
              width={265}
              height={30}
              alt='Gradnje plus'
              className='max-h-[30px] object-contain lg:max-h-[30px]'
            />
          </Link>
        </aside>
        <nav className='absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] md:block'>
          <ul className='flex items-center justify-center gap-8 text-base font-semibold leading-5 text-secondary-300'>
            {navItems.map((navItem, index) => (
              <Link
                href={navItem.link}
                key={index}
                className={cn(
                  '',
                  pathname === `${navItem.link}` && 'border-b-2 border-primary-300',
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
    </header>
  )
}

export default DesktopNavigation
