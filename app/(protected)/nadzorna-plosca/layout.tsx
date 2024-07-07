import type { Metadata } from 'next';
import { Archivo, Montserrat } from 'next/font/google';
import '../../globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import WithDashBoardNavigation from '@/components/with-dashboard-navigation';
import { getLocations } from '@/actions/get-all-locations';

const montserrat = Montserrat({ subsets: ['latin'] });
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const location = await getLocations() || [];


  return (
    <SessionProvider session={session}>
      <html lang="sl">
        <body className={`${montserrat.className} ${archivo.variable}`}>
          <WithDashBoardNavigation navItems={location}>
            {children}
          </WithDashBoardNavigation>
        </body>
      </html>
    </SessionProvider>
  );
}
