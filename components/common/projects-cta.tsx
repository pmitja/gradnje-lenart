import Image from 'next/image'
import Link from 'next/link'

interface ProjectsCtaProps {
  title?: string
  description?: string
  buttonText?: string
  backgroundImage?: string
}

const ProjectsCta = ({
  title = 'Odkrijte naše projekte',
  description = 'Poglejte si našo zbirko uspešno izvedenih nepremičninskih projektov in navdihnite svojo naslednjo naložbo.',
  buttonText = 'Vsi projekti',
  backgroundImage = '/abstract-pattern.png',
}: ProjectsCtaProps) => (
    <section className="relative my-8 overflow-hidden rounded-lg bg-gradient-to-r from-primary-100 to-primary-50 py-16">
      <div className="absolute inset-0 opacity-10">
        <Image
          src={backgroundImage}
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      <div className="container relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-secondary-500 md:text-4xl">{title}</h2>
          <p className="mb-6 text-lg text-secondary-400">{description}</p>
        </div>
        <div className="shrink-0">
          <Link
            href="/projekti"
            className="hover:bg-secondary-600 inline-flex items-center gap-2 rounded-md bg-secondary-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
)

export default ProjectsCta
