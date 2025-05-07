import '../globals.css'

import type { Metadata } from 'next'
import { Archivo, Montserrat } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'sonner'

import { auth } from '@/auth'
import WithLayout from '@/components/with-layout'

const montserrat = Montserrat({
  subsets: [ 'latin' ],
})

const archivo = Archivo({
  subsets: [ 'latin' ], variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'Gradnje Lenart',
  description: 'Gradnje Lenart',
  icons: [
    {
      rel: 'icon',
      url: '/favicon-32x32.ico',
      sizes: '32x32',
      type: 'image/ico',
    },
    {
      rel: 'icon',
      url: '/favicon-256x256.ico',
      sizes: '256x256',
      type: 'image/ico',
    },
  ],
}

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang='sl'>
        <body className={`${montserrat.className} ${archivo.variable} overflow-x-hidden`}>
          <WithLayout layout='centered'>{children}</WithLayout>
          <Toaster position="top-center" />
        </body>
      </html>
    </SessionProvider>
  )
}
