/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */

'use client'

import 'yet-another-react-lightbox/styles.css'

import { Location, RealEstate } from '@prisma/client'
import gsap from 'gsap'
import { Building, ChevronLeft, ChevronRight, Home, ThumbsUp, Users, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Project extends Location {
  realEstates: RealEstate[]
}

interface ProjectReferenceProps {
  projects: Project[]
}

const calculateOverallStats = (projects: Project[]) => {
  const totalProjects = projects.length

  const totalUnits = projects.reduce((sum, project) => sum + project.realEstates.length, 0)

  const satisfiedCustomers = totalUnits // Assuming one customer per unit sold

  return {
    totalProjects,
    totalUnits,
    satisfiedCustomers,
  }
}

export default function ProjectReference({ projects }: ProjectReferenceProps) {
  const [ currentProject, setCurrentProject ] = useState(0)

  const [ nextProject, setNextProject ] = useState(1)

  const titleRef = useRef(null)

  const yearRef = useRef(null)

  const unitsRef = useRef(null)

  const customersRef = useRef(null)

  const currentProjectRef = useRef(null)

  const nextProjectRef = useRef(null)

  const statsRefs = {
    totalProjects: useRef(null),
    totalUnits: useRef(null),
    satisfiedCustomers: useRef(null),
  }

  const project = projects[currentProject]

  const nextProjectData = projects.length > 1
    ? projects[(currentProject + 1) % projects.length] : null

  const [ isLightboxOpen, setIsLightboxOpen ] = useState(false)

  const [ lightboxImages, setLightboxImages ] = useState<{ src: string }[]>([])

  const prepareLightboxImages = (project: Project) => {
    const images: string[] = []

    if (project.images) {
      images.push(...project.images)
    }
    project.realEstates.forEach((estate) => {
      if (estate.images) {
        images.push(...estate.images)
      }
    })
    return images.map((img) => ({
      src: `https://utfs.io/f/${img}`,
    }))
  }

  const overallStats = calculateOverallStats(projects)

  useEffect(() => {
    if (projects.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [
          titleRef.current,
          yearRef.current,
          unitsRef.current,
          customersRef.current,
          currentProjectRef.current,
        ],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
      )
      if (nextProjectRef.current) {
        gsap.fromTo(
          nextProjectRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
        )
      }

      // Animate stats
      Object.entries(statsRefs).forEach(([ key, ref ]) => {
        gsap.fromTo(
          ref.current,
          {
            textContent: '0',
          },
          {
            textContent: overallStats[key as keyof typeof overallStats],
            duration: 2,
            ease: 'power1.inOut',
            snap: {
              textContent: 1,
            },
            stagger: 0.2,
          },
        )
      })
    })

    return () => ctx.revert()
  }, [ currentProject, nextProject, projects, overallStats ])

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setNextProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrevious = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setNextProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  if (projects.length === 0) {
    return <div>No projects available.</div>
  }

  return (
    <div className="relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover pt-6 sm:pt-10 md:pt-16 lg:pt-20">
      <div className="container relative flex w-full flex-col items-center justify-center gap-4 border-none bg-inherit pb-6 sm:gap-6 sm:pb-8 md:gap-8 md:pb-12 lg:pb-16">
        <h1
          ref={titleRef}
          className="text-3xl font-bold text-secondary-400 sm:text-4xl lg:text-4xl lg:leading-tight xl:text-5xl"
        >
          {project.name}
        </h1>
        <div className="w-full max-w-4xl">
          <div className="mb-4 grid grid-cols-2 gap-2 sm:gap-4">
            <div className="rounded-lg border border-secondary-200 bg-secondary-100/50 p-3 text-body-200 sm:p-4">
              <h3 ref={yearRef} className="text-xl font-bold sm:text-2xl">
                {new Date(project.createdAt).getFullYear()}
              </h3>
              <p className="text-xs sm:text-sm">Leto gradnje</p>
            </div>
            <div className="rounded-lg border border-secondary-200 bg-secondary-100/50 p-3 text-body-200 sm:p-4">
              <h3 ref={unitsRef} className="text-xl font-bold sm:text-2xl">
                {project.realEstates.length}
              </h3>
              <p className="text-xs sm:text-sm">Stanovanj</p>
            </div>
          </div>
          <p className="mb-4 text-sm text-secondary-400 sm:text-base">{project.description}</p>
          <div ref={customersRef} className="mb-4 flex items-center">
            <ThumbsUp className="mr-2 size-4 text-primary-200 sm:size-5" />
            <span className="text-xs sm:text-sm">
              Več kot {project.realEstates.length} zadovoljnih kupcev
            </span>
          </div>
          <div className="mb-4">
            {projects.length > 1 && (
              <div className="mb-2 flex justify-between">
                <Button
                  onClick={handlePrevious}
                  variant="secondary"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  <ChevronLeft className="mr-1 size-3 sm:size-4" /> Prejšnji
                </Button>
                <Button
                  onClick={handleNext}
                  size="sm"
                  variant="primary"
                  className="text-xs sm:text-sm"
                >
                  Naslednji <ChevronRight className="ml-1 size-3 sm:size-4" />
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {project.images && project.images[0] && (
                <div ref={currentProjectRef} className={cn('w-full sm:w-2/3', !nextProjectData && 'sm:w-full')}>
                  <Image
                    src={`https://utfs.io/f/${project.images[0]}` || '/placeholder.svg'}
                    alt={project.name}
                    className="w-full cursor-pointer rounded-lg object-cover shadow-lg"
                    width={1000}
                    height={1000}
                    style={{
                      maxHeight: '50dvh',
                      objectFit: 'cover',
                    }}
                    onClick={() => {
                      setLightboxImages(prepareLightboxImages(project))
                      setIsLightboxOpen(true)
                    }}
                  />
                </div>
              )}
              {nextProjectData && nextProjectData.images && nextProjectData.images[0] && (
                <div ref={nextProjectRef} className="w-full sm:w-1/3">
                  <Image
                    src={`https://utfs.io/f/${nextProjectData.images[0]}` || '/placeholder.svg'}
                    alt={nextProjectData.name}
                    className="w-full rounded-lg object-cover shadow-lg"
                    width={1000}
                    height={1000}
                    style={{
                      maxHeight: '30dvh',
                      objectFit: 'cover',
                    }}
                  />
                  <p className="mt-2 text-xs font-semibold sm:text-sm">
                    Naslednji: {nextProjectData.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Stats Section */}
          <div className="mt-8 p-4 sm:p-6">
            <h2 className="mb-4 text-center text-xl font-bold text-secondary-400 sm:text-2xl">Referenčni podatki</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-secondary-200 bg-secondary-100/50 p-3 text-body-200 sm:p-4">
                <Building className="mb-2 size-8 text-body-200" />
                <span className="text-2xl font-bold sm:text-3xl" ref={statsRefs.totalProjects}>
                  0
                </span>
                <span className="text-sm text-body-200">Zaključenih projektov</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-secondary-200 bg-secondary-100/50 p-3 text-body-200 sm:p-4">
                <Home className="mb-2 size-8 text-body-200" />
                <span className="text-2xl font-bold sm:text-3xl" ref={statsRefs.totalUnits}>
                  0
                </span>
                <span className="text-sm text-body-200">Zgrajenih nepremičnin</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-secondary-200 bg-secondary-100/50 p-3 text-body-200 sm:p-4">
                <Users className="mb-2 size-8 text-body-200" />
                <span className="text-2xl font-bold sm:text-3xl" ref={statsRefs.satisfiedCustomers}>
                  0
                </span>
                <span className="text-sm text-body-200">Zadovoljnih kupcev</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={lightboxImages}
        styles={{
          root: {
            zIndex: 21470002,
          },
        }}
        render={{
          iconClose: () => <X className="size-6" />,
        }}
        toolbar={{
          buttons: [
            'close',
          ],
        }}
      />
    </div>
  )
}
