import { z } from "zod";

export const Route = {
  name: "ProtectedNadzornaPloscaAktualniProjektSlug",
  params: z.object({
    slug: z.string(),
  })
};

