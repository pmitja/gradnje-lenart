'use client'

import Image from 'next/image'
import { useCallback, useEffect, useTransition } from 'react'

import { getLocationsByCity } from '@/actions/get-locations-by-city'
import ButtonWithIcon from '@/components/common/button-with-icon'
import NoResultsBanner from '@/components/common/no-results-banner'
import Spinner from '@/components/common/spinner'
import CloseIcon from '@/components/icons/close'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PublicProjektSlug } from '@/routes'
import { useAppStore } from '@/store/app'

const ProjectElement = ({
  title,
  link,
  images,
  description,
}: {
  title: string
  link: string
  images?: string[]
  description: string
}) => (
  <div className='row-span-3 flex flex-col overflow-hidden rounded-lg bg-[#AEA490]/30 shadow-md md:px-8'>
    <Image
      className='mx-auto max-h-[50%] w-full object-cover md:ml-0'
      width={733}
      height={500}
      src={images && images[0] ? `https://utfs.io/f/${images[0]}` : '/apartment-image.webp'}
      alt='Image'
    />
    <div className='flex h-full flex-col place-content-start gap-2 py-4 md:justify-between'>
      <h3 className='text-start text-2xl font-bold text-primary-400 lg:text-3xl'>
        {title}
      </h3>
      <p className='self-start text-sm lg:text-base'>{description}</p>
      <PublicProjektSlug.Link
        slug={link}
      >
        <ButtonWithIcon
          variant='primary'
          className='max-w-fit drop-shadow-primary-button transition hover:translate-y-1'
        >
          Pojdi na projekt
        </ButtonWithIcon>
      </PublicProjektSlug.Link>
    </div>
  </div>
)

const ProjectsSection = () => {
  const {
    projectFilters,
    currentProjects,
    updateCurrentProjects,
    updateProjectFilters,
    resetFilters,
  } = useAppStore()

  const [ isPending, startTransition ] = useTransition()

  const fetchProjects = useCallback((filters: typeof projectFilters) => {
    startTransition(async () => {
      const projects = await getLocationsByCity(filters)

      updateCurrentProjects(Array.isArray(projects) ? projects : [])
    })
  }, [ startTransition, updateCurrentProjects ])

  const handleFilterRemove = (filter: string) => {
    const newFilters = {
      location: projectFilters.location === filter ? 'all' : projectFilters.location,
      type: projectFilters.type === filter ? 'all' : projectFilters.type,
    }

    updateProjectFilters(newFilters)
    fetchProjects(newFilters)
  }

  useEffect(() => {
    fetchProjects(projectFilters)
  }, [ projectFilters, fetchProjects ])

  return (
    <section className='flex flex-col gap-3 lg:gap-5'>
      <div className='py-12 text-secondary-400 sm:py-16 lg:py-20'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mb-4 flex max-w-2xl flex-col items-center gap-2 text-center lg:mb-0'>
            <Badge className='bg-primary-200 text-sm font-medium text-body-200'>Gradnje Plus</Badge>
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
            <div className='mt-10 grid grid-cols-1 gap-10 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-3 md:text-left'>
              {currentProjects.map((project) => (
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
            <NoResultsBanner onReset={resetFilters} />
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
