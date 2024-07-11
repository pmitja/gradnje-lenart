'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavbarProps } from '@/types/general';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DesktopNavigation = ({ navItems }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 right-0 left-0 py-5 flex items-center justify-between z-10 bg-body-75">
      <div className="container mx-auto flex w-full justify-between">
        <aside>
          <Link href={'/'} className="flex items-center gap-2">
            <Image
              src={'/gradnje-plus-logo.webp'}
              width={265}
              height={50}
              alt="Gradnje plus"
              className="md:max-w-[193px] max-h-[35px] lg:max-w-[265px] lg:max-h-[45px]"
            />
          </Link>
        </aside>
        <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <ul className="flex items-center justify-center gap-8 text-secondary-300 text-base leading-5 lg:text-lg lg:leading-6 font-semibold">
            {navItems.map((navItem, index) => (
              <Link
                href={navItem.link}
                key={index}
                className={cn(
                  '',
                  pathname === `${navItem.link}` &&
                    'border-b-2 border-primary-300'
                )}>
                {navItem.text}
              </Link>
            ))}
          </ul>
        </nav>
        <aside className="flex gap-2 items-center">
          <Button variant="secondary">FAQ</Button>
          <Button variant="primary">Kontakt</Button>
        </aside>
      </div>
    </div>
  );
};

export default DesktopNavigation;
