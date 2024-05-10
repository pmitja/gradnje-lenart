import type { FC } from 'react';
import Navigation from './containers/navigation';
import { auth } from '@/auth';
import { User } from 'next-auth';

const WithNavigation: FC = async () => {
  const session = await auth();

  return (
    <Navigation user={session?.user as User & { role: 'ADMIN' | 'USER' }} />
  );
};

export default WithNavigation;