import Image from 'next/image'

import ProjectsFilter from '@/components/common/projects-filter/projects-filter'
import { Badge } from '@/components/ui/badge'

const ProjectFilterHero = () => (
  <div className="relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover py-16 lg:py-20">
    <div className="container relative px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left side - Text and filters */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-primary-600 mb-3 text-sm font-medium">Najdite svoj sanjski dom že danes.</p>
          <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
            <span className="text-secondary-800">Vaša </span>
            <span className="text-primary-400">Nepremičnina</span>
            <span className="text-secondary-800">, Naša Prioriteta.</span>
          </h1>

          <div className="mb-8 mt-2 rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-secondary-800 mb-4 text-xl font-semibold">Najdite Svoj Dom</h3>
            <ProjectsFilter />
          </div>

          {/* Popular search tags */}
          <div className="mt-2">
            <div className="text-secondary-600 text-sm font-medium">Priljubljeno Iskanje</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="text-secondary-600 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary-50">
                Večstanovanjski objekti
              </Badge>
              <Badge className="text-secondary-600 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary-50">
                Hiše
              </Badge>
              <Badge className="text-secondary-600 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary-50">
                Stanovanja
              </Badge>
            </div>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="relative grid grid-cols-12 gap-4">
            <div className="col-span-8 col-start-1 row-span-1">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/apartment-image.webp"
                  alt="Moderna zunanjost stanovanja"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>

            <div className="col-span-6 col-start-7 row-span-1 row-start-1">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/apartment-image.webp"
                  alt="Luksuzna dnevna soba"
                  width={300}
                  height={200}
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>

            <div className="col-span-5 col-start-8 row-span-1 row-start-2">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/apartment-image.webp"
                  alt="Moderna kuhinja"
                  width={300}
                  height={200}
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>

            <div className="col-span-7 col-start-1 row-span-1 row-start-2">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/apartment-image.webp"
                  alt="Zunanjost nepremičnine"
                  width={350}
                  height={200}
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectFilterHero
