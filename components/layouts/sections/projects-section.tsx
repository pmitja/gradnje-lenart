'use client'

import { getAllLocations } from '@/actions/get-all-locations'
import { getLocationsByCity } from '@/actions/get-locations-by-city'
import ButtonWithIcon from '@/components/common/button-with-icon'
import NoResultsBanner from '@/components/common/no-results-banner'
import Spinner from '@/components/common/spinner'
import CloseIcon from '@/components/icons/close'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useTransition } from 'react'

const ProjectsSection = () => {
  const {
    projectFilters,
    currentProjects,
    updateCurrentProjects,
    updateProjectFilters,
    resetFilters
  } = useAppStore()
  const [isPending, startTransition] = useTransition()

  const handleFilterRemove = (filter: string) => {
    const newFilters = {
      location: projectFilters.location === filter ? 'all' : projectFilters.location,
      type: projectFilters.type === filter ? 'all' : projectFilters.type
    }
    updateProjectFilters(newFilters)
    startTransition(async () => {
      getLocationsByCity(newFilters).then((projects) => {
        if (Array.isArray(projects)) {
          updateCurrentProjects(projects)
        } else {
          updateCurrentProjects([])
        }
      })
    })
  }

  useEffect(() => {
    startTransition(async () => {
      getLocationsByCity(projectFilters).then((projects) => {
        if (Array.isArray(projects)) {
          updateCurrentProjects(projects)
        } else {
          updateCurrentProjects([])
        }
      })
    })
  }, [projectFilters, startTransition, updateCurrentProjects])

  return (
    <section className='flex flex-col gap-3 lg:gap-5'>
      <div className='py-12 text-secondary-400 sm:py-16 lg:py-20'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mb-4 max-w-2xl text-center lg:mb-0'>
            <p className='text-sm font-medium text-secondary-500'>Gradnje Plus</p>
            <h2 className='mt-2 text-3xl font-bold sm:text-4xl xl:text-5xl'>Aktualni projekti</h2>
            <hr className='mx-auto mt-4 h-2 w-32 border-none bg-primary-200' />
          </div>
          {(projectFilters.location || projectFilters.type) && !isPending && (
            <div className='flex flex-wrap gap-3'>
              {projectFilters.location && projectFilters.location !== 'all' && (
                <Badge variant={'pills'}>
                  {projectFilters.location}
                  <Button
                    variant={'plain'}
                    size={'plain'}
                    onClick={() => handleFilterRemove(projectFilters.location ?? '')}
                  >
                    <CloseIcon />
                  </Button>
                </Badge>
              )}
              {projectFilters.type && projectFilters.type !== 'all' && (
                <Badge variant={'pills'}>
                  {projectFilters.type}
                  <Button
                    variant={'plain'}
                    size={'plain'}
                    onClick={() => handleFilterRemove(projectFilters.type ?? '')}
                  >
                    <CloseIcon />
                  </Button>
                </Badge>
              )}
            </div>
          )}
          {!isPending && (
            <div className='mt-10 grid grid-cols-1 gap-10 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-2 md:text-left'>
              {currentProjects.map((project, index) => (
                <ProjectElement
                  key={project.id}
                  title={project.name}
                  link={project.slug}
                  images={project.images}
                  description={project.description}
                />
              ))}
            </div>
          )}
          {isPending && <Spinner />}
          {currentProjects.length === 0 && !isPending && (
            <NoResultsBanner resetFilters={resetFilters} />
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

const ProjectElement = ({
  title,
  link,
  images,
  description
}: {
  title: string
  link: string
  images?: string[]
  description: string
}) => (
  <div className='row-span-3 flex flex-col rounded-lg bg-[#AEA490]/30 shadow-md md:px-8'>
    <Image
      className='h mx-auto max-h-[50%] w-full object-cover md:ml-0'
      width={733}
      height={500}
      src={images && images[0] ? `https://utfs.io/f/${images[0]}` : '/apartment-image.webp'}
      alt='Image'
    />
    <div className='flex h-full flex-col place-content-start gap-4 p-4 md:justify-between'>
      <h3 className='text-start text-3xl font-bold text-primary-400 md:text-2xl lg:text-4xl'>
        {title}
      </h3>
      <p className='text-sm lg:text-base'>{description}</p>
      <Link href={`projekt/${link}`}>
        <ButtonWithIcon
          variant='primary'
          className='max-w-fit px-6 py-4 text-xl drop-shadow-primary-button transition hover:translate-y-1'
        >
          Pojdi na projekt
        </ButtonWithIcon>
      </Link>
    </div>
  </div>
)
