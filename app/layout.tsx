import type { Metadata } from 'next';
import { Archivo, Montserrat } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { ThemeProvider } from '@/providers/theme-provider';
import WithLayout from '@/components/with-layout';
import { cn } from '@/lib/utils';

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
  return (
    <SessionProvider session={session}>
      <html lang="sl">
        <body className={`${montserrat.className} ${archivo.variable} bg-body-75`}>
          <WithLayout layout="centered">{children}</WithLayout>
        </body>
      </html>
    </SessionProvider>
  );
}
