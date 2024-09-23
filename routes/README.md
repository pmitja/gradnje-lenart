This application supports typesafe routing for NextJS using the `declarative-routing` system.

# What is `declarative-routing`?

Declarative Routes is a system for typesafe routing in React. It uses a combination of TypeScript and a custom routing system to ensure that your routes are always in sync with your code. You'll never have to worry about broken links or missing routes again.

In NextJS applications, Declarative Routes also handles API routes, so you'll have typesafe input and output from all of your APIs. In addition to `fetch` functions that are written for you automatically.

# Route List

Here are the routes of the application:

| Route | Verb | Route Name | Using It |
| ----- | ---- | ---- | ---- |
| `/(protected)/nadzorna-plosca/aktualni-projekt/[slug]` | - | `ProtectedNadzornaPloscaAktualniProjektSlug` | `<ProtectedNadzornaPloscaAktualniProjektSlug.Link>` |
| `/(protected)/nadzorna-plosca/aktualni-projekt/nov` | - | `ProtectedNadzornaPloscaAktualniProjektNov` | `<ProtectedNadzornaPloscaAktualniProjektNov.Link>` |
| `/(protected)/nadzorna-plosca` | - | `ProtectedNadzornaPlosca` | `<ProtectedNadzornaPlosca.Link>` |
| `/(public)` | - | `Public` | `<Public.Link>` |
| `/(public)/projekt/[slug]/[id]` | - | `PublicProjektSlugId` | `<PublicProjektSlugId.Link>` |
| `/(public)/projekt/[slug]` | - | `PublicProjektSlug` | `<PublicProjektSlug.Link>` |
| `/(public)/projekti` | - | `PublicProjekti` | `<PublicProjekti.Link>` |
| `/api/auth/[...nextauth]` | - | `ApiAuthNextauth` | `<ApiAuthNextauth.Link>` |
| `/api/uploadthing` | - | `ApiUploadthing` | `<ApiUploadthing.Link>` |
| `/auth/error` | - | `AuthError` | `<AuthError.Link>` |
| `/auth/login` | - | `AuthLogin` | `<AuthLogin.Link>` |
| `/auth/new-password` | - | `AuthNewPassword` | `<AuthNewPassword.Link>` |
| `/auth/new-verification` | - | `AuthNewVerification` | `<AuthNewVerification.Link>` |
| `/auth/register` | - | `AuthRegister` | `<AuthRegister.Link>` |
| `/auth/reset-password` | - | `AuthResetPassword` | `<AuthResetPassword.Link>` |

To use the routes, you can import them from `@/middleware-routes` and use them in your code.

# Using the routes in your application

For pages, use the `Link` component (built on top of `next/link`) to link to other pages. For example:

```tsx
import { ProductDetail } from "@/middleware-routes";

return (
  <ProductDetail.Link productId={"abc123"}>Product abc123</ProductDetail.Link>
);
```

This is the equivalent of doing `<Link href="/product/abc123">Product abc123</Link>` but with typesafety. And you never have to remember the URL. If the route moves, the typesafe route will be updated automatically.

For APIs, use the exported `fetch` wrapping functions. For example:

```tsx
import { useEffect } from "react";
import { getProductInfo } from "@/middleware-routes";

useEffect(() => {
  // Parameters are typed to the input of the API
  getProductInfo({ productId: "abc123" }).then((data) => {
    // Data is typed to the result of the API
    console.log(data);
  });
}, []);
```

This is the equivalent of doing `fetch('/api/product/abc123')` but with typesafety, and you never have to remember the URL. If the API moves, the typesafe route will be updated automatically.

## Using typed hooks

The system provides three typed hooks to use in your application `usePush`, `useParams`, and `useSearchParams`.

* `usePush` wraps the NextJS `useRouter` hook and returns a typed version of the `push` function.
* `useParams` wraps `useNextParams` and returns the typed parameters for the route.
* `useSearchParams` wraps `useNextSearchParams` and returns the typed search parameters for the route.

For each hook you give the route to get the appropriate data back.

```ts
import { Search } from "@/middleware-routes";
import { useSearchParams } from "@/middleware-routes/hooks";

export default MyClientComponent() {
  const searchParams = useSearchParams(Search);
  return <div>{searchParams.query}</div>;
}
```

We had to extract the hooks into a seperate module because NextJS would not allow the routes to include hooks directly if
they were used by React Server Components (RSCs).

# Configure declarative-routing

After running `npx declarative-routing init`, you don't need to configure anything to use it.
However, you may want to customize some options to change the behavior of route generation.

You can edit `declarative-routing.config.json` in the root of your project. The following options are available:

- `mode`: choose between `react-router`, `nextjs` or `qwikcity`. It is automatically picked on init based on the project type.
- `routes`: the directory where the routes are defined. It is picked from the initial wizard (and defaults to `./src/components/declarativeRoutes`).
- `importPathPrefix`: the path prefix to add to the import path of the self-generated route objects, in order to be able to resolve them. It defaults to `@/app`.

# When your routes change

You'll need to run `npm run dr:build` to update the generated files. This will update the types and the `@/middleware-routes` module to reflect the changes.

The way the system works the `.info.ts` files are link to the `@/middleware-routes/index.ts` file. So changing the Zod schemas for the routes does **NOT** require a rebuild. You need to run the build command when:

- You change the name of the route in the `.info.ts` file
- You change the location of the route (e.g. `/product` to `/products`)
- You change the parameters of the route (e.g. `/product/[id]` to `/product/[productId]`)
- You add or remove routes
- You add or remove verbs from API routes (e.g. adding `POST` to an existing route)

You can also run the build command in watch mode using `npm run dr:build:watch` but we don't recommend using that unless you are changing routes a lot. It's a neat party trick to change a route directory name and to watch the links automagically change with hot module reloading, but routes really don't change that much.

# Finishing your setup

Post setup there are some additional tasks that you need to complete to completely typesafe your routes. We've compiled a handy check list so you can keep track of your progress.

- [ ] `/(protected)/nadzorna-plosca/aktualni-projekt/[slug]/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(protected)/nadzorna-plosca/aktualni-projekt/[slug]` to `<ProtectedNadzornaPloscaAktualniProjektSlug.Link>`
- [ ] Convert `params` typing in `/(protected)/nadzorna-plosca/aktualni-projekt/[slug]/page.ts` to `z.infer<>`
- [ ] `/(protected)/nadzorna-plosca/aktualni-projekt/nov/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(protected)/nadzorna-plosca/aktualni-projekt/nov` to `<ProtectedNadzornaPloscaAktualniProjektNov.Link>`
- [ ] `/(protected)/nadzorna-plosca/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(protected)/nadzorna-plosca` to `<ProtectedNadzornaPlosca.Link>`
- [ ] `/(public)/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(public)` to `<Public.Link>`
- [ ] `/(public)/projekt/[slug]/[id]/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(public)/projekt/[slug]/[id]` to `<PublicProjektSlugId.Link>`
- [ ] Convert `params` typing in `/(public)/projekt/[slug]/[id]/page.ts` to `z.infer<>`
- [ ] `/(public)/projekt/[slug]/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(public)/projekt/[slug]` to `<PublicProjektSlug.Link>`
- [ ] Convert `params` typing in `/(public)/projekt/[slug]/page.ts` to `z.infer<>`
- [ ] `/(public)/projekti/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/(public)/projekti` to `<PublicProjekti.Link>`
- [ ] `/api/auth/[...nextauth]/route.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/api/auth/[...nextauth]` to `<ApiAuthNextauth.Link>`
- [ ] Convert `params` typing in `/api/auth/[...nextauth]/route.ts` to `z.infer<>`
- [ ] `/api/uploadthing/route.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/api/uploadthing` to `<ApiUploadthing.Link>`
- [ ] `/auth/error/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/error` to `<AuthError.Link>`
- [ ] `/auth/login/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/login` to `<AuthLogin.Link>`
- [ ] `/auth/new-password/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/new-password` to `<AuthNewPassword.Link>`
- [ ] `/auth/new-verification/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/new-verification` to `<AuthNewVerification.Link>`
- [ ] `/auth/register/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/register` to `<AuthRegister.Link>`
- [ ] `/auth/reset-password/page.info.ts`: Add search typing to if the page supports search paramaters
- [ ] Convert `Link` components for `/auth/reset-password` to `<AuthResetPassword.Link>`
Once you've got that done you can remove this section.

# Why is `makeRoute` copied into the `@/middleware-routes` module?

You **own** this routing system once you install it. And we anticipate as part of that ownership you'll want to customize the routing system. That's why we create a `makeRoute.tsx` file in the `@/middleware-routes` module. This file is a copy of the `makeRoute.tsx` file from the `declarative-routing` package. You can modify this file to change the behavior of the routing system.

For example, you might want to change the way `GET`, `POST`, `PUT`, and `DELETE` are handled. Or you might want to change the way the `Link` component works. You can do all of that by modifying the `makeRoute.tsx` file.

We do **NOT** recommend changing the parameters of `makeRoute`, `makeGetRoute`, `makePostRoute`, `makePutRoute`, or `makeDeleteRoute` functions because that would cause incompatibility with the `build` command of `declarative-routing`.

# Credit where credit is due

This system is based on the work in [Fix Next.JS Routing To Have Full Type-Safety](https://www.flightcontrol.dev/blog/fix-nextjs-routing-to-have-full-type-safety). However the original article had a significantly different interface and didn't cover API routes at all.
