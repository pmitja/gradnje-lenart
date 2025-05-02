'use client'

import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Sample projects data - in a real app, this would come from an API or database
const projects = [
  {
    id: 'project1',
    title: 'Rezidenca Rožna dolina',
    location: 'Ljubljana, Rožna dolina',
    description: 'Luksuzna stanovanjska soseska z 28 stanovanjskimi enotami in podzemno garažo. Energetsko učinkovita gradnja z modernimi materiali.',
    image: '/apartment-image.webp',
    progress: 75,
    completion: 'December 2023',
    units: '28 stanovanj',
  },
  {
    id: 'project2',
    title: 'Poslovni center Tezno',
    location: 'Maribor, Tezno',
    description: 'Sodobni poslovni prostori s skupno površino 5.200 m². Prostori so primerni za različne dejavnosti, od pisarn do manjših proizvodnih prostorov.',
    image: '/apartment-image.webp',
    progress: 45,
    completion: 'Marec 2024',
    units: '15 poslovnih enot',
  },
  {
    id: 'project3',
    title: 'Obmorske vile Ankaran',
    location: 'Ankaran, Obala',
    description: 'Ekskluzivne vile z bazeni in neposrednim dostopom do morja. Moderne zasnove z velikimi steklenimi površinami in terasami.',
    image: '/apartment-image.webp',
    progress: 25,
    completion: 'Junij 2024',
    units: '8 vil',
  },
]

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <Card className="overflow-hidden rounded-lg">
    <div className="relative h-64 w-full">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-4 bottom-4">
        <h3 className="mb-1 text-2xl font-bold text-white">{project.title}</h3>
        <div className="flex items-center text-white/90">
          <MapPin className="mr-1 size-4" />
          <span className="text-sm">{project.location}</span>
        </div>
      </div>
    </div>

    <CardContent className="p-4">
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-secondary-200">Napredek gradnje</span>
          <span className="text-sm font-medium text-primary-300">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2 bg-gray-100 [&>[data-progress]]:bg-primary-300" />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-secondary-200">Zaključek projekta</p>
          <div className="flex items-center text-secondary-300">
            <Clock className="mr-1 size-4 text-primary-300" />
            <span>{project.completion}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-secondary-200">Število enot</p>
          <p className="text-secondary-300">{project.units}</p>
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-secondary-200">{project.description}</p>
    </CardContent>

    <CardFooter className="border-t border-gray-100 p-4">
      <Link href={`/projekti/${project.id}`} className="w-full">
        <Button variant="outline" className="w-full border-primary-200 text-primary-300 hover:bg-primary-50">
          Več o projektu
        </Button>
      </Link>
    </CardFooter>
  </Card>
)

export default function CurrentProjects() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
