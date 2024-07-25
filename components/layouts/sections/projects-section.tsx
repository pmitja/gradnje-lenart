"use client"

import { getAllLocations } from '@/actions/get-all-locations';
import { getLocationsByCity } from '@/actions/get-locations-by-city';
import ButtonWithIcon from '@/components/common/button-with-icon';
import { useAppStore } from '@/store/app';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useTransition } from 'react';

const ProjectsSection = () => {
  const { projectFilters, currentProjects, updateCurrentProjects } = useAppStore();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      if (projectFilters.location) {
        const projects = await getLocationsByCity(projectFilters);
        if (Array.isArray(projects)) {
          updateCurrentProjects(projects);
        }
      } else {
      const projects = await getAllLocations();
      if (projects) {
        updateCurrentProjects(projects);
      }
    }
    });
  }, [projectFilters])

  return (
    <section className="flex flex-col gap-3 lg:gap-5">
      <div className="py-12 text-secondary-400 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-secondary-500">
              Gradnje Plus
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl xl:text-5xl">
              Aktualni projekti
            </h2>
            <hr className="mx-auto mt-4 h-2 w-32 border-none bg-primary-200" />
          </div>

          {!isPending && <div className="mt-10 grid grid-cols-1 gap-10 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-2 md:text-left">
            {currentProjects.map((project, index) => {
              return (
                <ProjectElement
                  key={project.id}
                  title={project.name}
                  link={project.slug}
                  images={project.images}
                  description={project.description}
                />
              );
            })}
          </div>}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

const ProjectElement = ({
  title,
  link,
  images,
  description
}: {
  title: string;
  link: string;
  images?: string[];
  description: string
}) => (
  <div className="row-span-3 bg-[#AEA490]/30 md:px-8 rounded-lg shadow-md flex flex-col">
    <Image
      className="h mx-auto object-cover md:ml-0 w-full max-h-[50%]"
      width={733}
      height={500}
      src={
        images && images[0]
          ? `https://utfs.io/f/${images[0]}`
          : '/apartment-image.webp'
      }
      alt="Image"
    />
    <div className='flex flex-col place-content-start gap-4 md:justify-between p-4 h-full'>
      <h3 className="text-3xl md:text-2xl lg:text-4xl text-start font-bold text-primary-400">{title}</h3>
      <p className="text-sm lg:text-base">
        {description}
      </p>
      <Link href={link}>
        <ButtonWithIcon
          variant="primary"
          className="text-xl px-6 py-4 max-w-fit drop-shadow-primary-button transition hover:translate-y-1">
          Pojdi na projekt
        </ButtonWithIcon>
      </Link>
    </div>
  </div>
);