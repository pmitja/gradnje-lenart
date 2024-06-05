'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from '@/components/containers/container';
import { cn } from '@/lib/utils';
import CloseIcon from '@/components/icons/close';
import { NavbarProps } from '@/types/general';

type HamburgerButtonProps = {
  isOpen: boolean;
  handleMenu: () => void;
};

const HamburgerButton = ({ isOpen, handleMenu }: HamburgerButtonProps) => (
  <button
    className={cn(
      'group flex size-12 max-h-10 max-w-10 flex-col items-center justify-center',
      isOpen ? 'gap-0' : 'gap-[5px]'
    )}
    onClick={handleMenu}
    role="button"
    aria-label="Hamburger button">
    <div
      className={cn(
        'ease h-1 w-6 transform rounded-full bg-secondary-500 transition duration-300',
        isOpen
          ? 'translate-y-1 rotate-45 group-hover:opacity-100'
          : 'group-hover:opacity-100'
      )}
    />
    <div
      className={cn(
        'ease h-1 w-6 transform rounded-full bg-secondary-500 transition duration-300',
        isOpen ? 'opacity-0' : ' group-hover:opacity-100'
      )}
    />
    <div
      className={cn(
        'ease h-1 w-6 transform rounded-full bg-secondary-500 transition duration-300',
        isOpen
          ? '-translate-y-1 -rotate-45 group-hover:opacity-100'
          : ' group-hover:opacity-100'
      )}
    />
  </button>
);

const MobileNavigation = ({ navItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 py-5 flex items-center justify-between z-10 bg-body-75 mx-5"
        aria-label="Mobile Menu">
        <Link href={'/'}>
          <Image
            src={'/gradnje-plus-logo.webp'}
            alt="Gradnje plus"
            width={192}
            height={35}
          />
        </Link>
        <HamburgerButton isOpen={isOpen} handleMenu={handleMenu} />
      </nav>
      <Container
        className={cn(
          'absolute flex min-h-[calc(100dvh)] min-w-full flex-col gap-6 bg-body-75 p-6 text-xl transition-all duration-500 z-20',
          isOpen ? 'animation-fadeAndSlideIn' : '-translate-y-full opacity-0'
        )}
        role="navigation"
        aria-label="Mobile menu navigation">
        <button className="w-full flex justify-end" onClick={handleMenu}>
          <CloseIcon width={40} height={40} />
        </button>
        <ul className="flex items-center justify-center gap-8 "></ul>
        {navItems.map((navItem) => (
          <li className='list-none pb-4'>
            <Link href={navItem.link} key={navItem.link} className='text-secondary-300 text-3xl leading-6 font-semibold'>
              {navItem.text}
            </Link>
          </li>
        ))}
      </Container>
    </>
  );
};

export default MobileNavigation;
