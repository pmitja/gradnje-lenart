import '../../globals.css'

import type { Metadata } from 'next'
import { Archivo, Montserrat } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'sonner'

import { getAllLocationsActiveAndFinished } from '@/actions/get-inactive-locations-active-and-finished'
import { auth } from '@/auth'
import WithDashBoardNavigation from '@/components/with-dashboard-navigation'
// You'll need to implement this function

const montserrat = Montserrat({
  subsets: [ 'latin' ],
})

const archivo = Archivo({
  subsets: [ 'latin' ],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'Gradnje Plus',
  description: 'Gradnje Plus',
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

  const userRole = session?.user?.role || 'USER'

  const location = (await getAllLocationsActiveAndFinished()) || []

  return (
    <SessionProvider session={session}>
      <html lang="sl">
        <body className={`${montserrat.className} ${archivo.variable}`}>
          <WithDashBoardNavigation
            activeNavItems={location.filter((loc) => loc.isActive)}
            finishedNavItems={location.filter((loc) => !loc.isActive)}
            userRole={userRole}
          >
            {children}
          </WithDashBoardNavigation>
          <Toaster position="top-center" />
        </body>
      </html>
    </SessionProvider>
  )
}
