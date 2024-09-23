import { z } from 'zod'

export const Route = {
  name: 'PublicProjektSlug',
  params: z.object({
    slug: z.string(),
  }),
}
