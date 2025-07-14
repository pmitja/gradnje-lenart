'use client'

import Image from 'next/image'

import ProjectsFilter from '@/components/common/projects-filter/projects-filter'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app'
import { LocationType } from '@/types/general'

interface ProjectFilterHeroProps {
  onFilter?: () => void
}

const ProjectFilterHero = ({ onFilter }: ProjectFilterHeroProps) => {
  const { updateProjectFilters } = useAppStore()

  const handlePopularSearchClick = (type: string) => {
    updateProjectFilters({
      type, location: 'all',
    })
  }

  return (
    <div className="relative inset-x-1/2 mx-[-50vw] min-h-[60dvh] w-screen py-16 lg:py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-hero-page">
      </div>
      <div className="container relative px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left side - Text and filters */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="mb-6 flex max-w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-secondary-300 shadow-lg">Najdite svoj sanjski dom že danes.</p>
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
              <span className="text-secondary-300">Vaša </span>
              <span className="text-primary-400">nepremičnina</span>
              <span className="text-secondary-300">, naša prioriteta.</span>
            </h1>

            <div className="mb-8 mt-2 rounded-xl bg-white p-5 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-secondary-500">Najdite svoj dom</h3>
              <ProjectsFilter onFilter={onFilter} />
            </div>

            {/* Popular search tags */}
            <div className="mt-2">
              <div className="text-sm font-medium text-white">Priljubljeno iskanje</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-secondary-500 shadow-sm hover:bg-secondary-50"
                  onClick={() => handlePopularSearchClick(LocationType.Apartments)}
                >
                  Večstanovanjski objekti
                </Badge>
                <Badge
                  className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-secondary-500 shadow-sm hover:bg-secondary-50"
                  onClick={() => handlePopularSearchClick(LocationType.House)}
                >
                  Hiše
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
                    src="/filters-hero-2.webp"
                    alt="Moderna zunanjost stanovanja"
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover object-[0_38%]"
                  />
                </div>
              </div>

              <div className="col-span-6 col-start-7 row-span-1 row-start-1">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/filters-hero-1.webp"
                    alt="Luksuzna dnevna soba"
                    width={300}
                    height={200}
                    className="h-44 w-full object-cover object-[0_27%]"
                  />
                </div>
              </div>

              <div className="col-span-5 col-start-8 row-span-1 row-start-2">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/filters-hero-4.webp"
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
                    src="/filters-hero-3.webp"
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
}

export default ProjectFilterHero
