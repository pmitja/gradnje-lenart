import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import authConfig from '@/auth-config'
import { apiAuthPrefix,
  apiUploadThingPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes } from '@/middleware-routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req

  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isExactPublicRoute = publicRoutes.includes(nextUrl.pathname)

  const isPublicRoute = publicRoutes.some((route) => route !== '/' && nextUrl.pathname.startsWith(route))

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const isUploadThingRoute = nextUrl.pathname.startsWith(apiUploadThingPrefix)

  // Allow API routes
  if (isUploadThingRoute || isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth routes
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // Redirect to login for non-public routes when not logged in
  if (!isLoggedIn && !isExactPublicRoute && !isPublicRoute) {
    const callbackUrl = nextUrl.pathname + (nextUrl.search || '')

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  // Proceed if everything is fine
  return NextResponse.next()
})

export const config = {
  matcher: [ '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)' ],
}
