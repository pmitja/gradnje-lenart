import { z } from "zod";

export const Route = {
  name: "PublicProjektSlugId",
  params: z.object({
    slug: z.string(),
    id: z.string(),
  })
};

