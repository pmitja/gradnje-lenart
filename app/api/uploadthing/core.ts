import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

import { currentUser } from '@/lib/auth'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: '4MB', maxFileCount: 6,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await currentUser()

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
      }
    })
    .onUploadComplete(async ({ file }) => ({
      url: file.url,
      name: file.name,
      key: file.key,
    })),
  fileUpload: f({
    pdf: {
      maxFileSize: '8MB', maxFileCount: 6,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await currentUser()

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
      }
    })
    .onUploadComplete(async ({ file }) => ({
      url: file.url,
      name: file.name,
      key: file.key,
    })),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
