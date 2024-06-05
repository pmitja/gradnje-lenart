import { Button } from '@/components/ui/button';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: null | (User & { role: 'ADMIN' | 'USER' });
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 bg-body-75">
      <div className='container mx-auto flex w-full justify-between'>
      <aside>
        <Link href={'/'} className='flex items-center gap-2'>
          <Image
            src={'/gradnje-plus-logo.webp'}
            width={265}
            height={50}
            alt="Gradnje plus"
            className='md:max-w-[193px] max-h-[35px] lg:max-w-[265px] lg:max-h-[45px]'
          />
        </Link>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8 text-secondary-300 text-base leading-5 lg:text-lg lg:leading-6 font-semibold">
          <Link href={'#'}>Projekti</Link>
          <Link href={'#'}>Podjetje</Link>
          <Link href={'#'}>Reference</Link>
          <Link href={'#'}>Kontakt</Link>
          <Link href={'#'}>Blog</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Button variant='secondary'>FAQ</Button>
        <Button variant='primary'>Kontakt</Button>
      </aside>
      </div>
    </div>
  );
};

export default Navigation;
