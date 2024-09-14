/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/auth',
  '/auth/new-verification',
  '/api/uploadthing?slug=imageUploader',
  '/projekti',
  '/projekt',
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset-password',
  '/auth/new-password',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The prefix for API uploadthing routes
 * Routes that start with this prefix are used for API uploadthing purposes
 * @type {string}
 */
export const apiUploadThingPrefix = '/api/uploadthing'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/nadzorna-plosca'
