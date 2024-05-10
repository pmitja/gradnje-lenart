import LoginButton from '@/components/auth/login-button';
import { ThemeToggle } from '@/components/global/theme-toggle';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: null | (User & { role: 'ADMIN' | 'USER' });
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside>
        <Link href={'/'} className='flex items-center gap-2'>
          <Image
            src={'/start-logo.svg'}
            width={40}
            height={40}
            alt="plur logo"
          />
          <span className="text-xl font-bold"> Start.</span>
        </Link>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'#'}>Pricing</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Documentation</Link>
          <Link href={'#'}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <LoginButton>Login</LoginButton>
        <ThemeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
