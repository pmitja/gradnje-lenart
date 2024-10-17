import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getRandomProject } from '@/actions/get-random-project'
import DoubleChervonRightIcon from '@/components/icons/double-chervon-right'
import { Button } from '@/components/ui/button'
import { PublicProjekti } from '@/routes'

import ButtonWithIcon from '../button-with-icon'

const Hero = async () => {
  const randomProject = await getRandomProject()

  return (
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-primary-75 pt-4 sm:pt-6 md:pt-10 lg:pt-0'>
      <div className='container relative grid w-full justify-center gap-4 sm:gap-6 lg:w-full lg:grid-cols-2 lg:gap-8'>
        <div className='relative flex flex-col justify-center gap-3 sm:gap-4 lg:gap-5'>
          <div className='flex max-w-fit gap-1 rounded-lg bg-primary-500 px-2 py-1 font-archivo text-xs font-semibold text-body-200 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm'>
            <DoubleChervonRightIcon className="size-3 sm:size-4" />
            Pozdravljeni, najdite svoje sanje!
          </div>
          <h1 className='text-xl font-bold leading-tight sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight'>
            Najdite, kupite & stanujte v svoji nepremični z nami!
          </h1>
          <p className='font-archivo text-sm leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg'>
            Imeli boste vse pomembno v svoji bližini: trgovino, banko, pošto, šolo, vrtec, družinam
            prijazne soseske...
          </p>
          <div className='flex flex-wrap gap-3 sm:gap-4 lg:mt-2'>
            <PublicProjekti.Link>
              <ButtonWithIcon
                asChild
                variant='primary'
                className='px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base'
              >
                Akutalni projekti
              </ButtonWithIcon>
            </PublicProjekti.Link>
            <ButtonWithIcon
              variant='secondary'
              className='px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base'
            >
              Vstopite v stik
            </ButtonWithIcon>
          </div>
          <Image
            src={'/hero-pattern.webp'}
            alt='Pattern'
            width='260'
            height='230'
            className='absolute -bottom-px right-[-41px] hidden lg:block'
          />
        </div>
        <div className='relative inset-x-1/2 mx-[-50vw] flex w-screen flex-col items-center lg:inset-x-auto lg:mx-auto lg:w-full'>
          <div className='relative w-full md:flex md:flex-col md:items-center'>
            <Image
              src={randomProject?.images[0] ? `https://utfs.io/f/${randomProject?.images[0]}` : '/hero-image.webp'}
              alt='Hero image'
              width='795'
              height='700'
              className='h-[200px] w-full object-cover sm:h-[250px] md:h-[350px] lg:h-[500px]'
            />
            <span className='absolute bottom-0 left-0 bg-[#3E5566]/50 px-2 py-1 font-archivo text-sm font-bold leading-normal text-body-200 sm:px-3 sm:py-2 sm:text-base md:hidden lg:block lg:px-4 lg:py-2 lg:text-lg'>
              Aktualni projekti
            </span>
            <Image
              src={'/hero-pattern-2.webp'}
              alt='Pattern'
              width='177'
              height='166'
              className='absolute bottom-0 right-0 hidden lg:block'
            />
          </div>
          <div className='flex w-full flex-col justify-between gap-3 bg-body-100 px-3 py-2 sm:px-4 sm:py-3 lg:flex-row lg:bg-body-75 lg:p-6'>
            <div className='flex flex-col gap-1 sm:gap-2'>
              <h3 className='text-base font-bold leading-tight text-secondary-400 sm:text-lg sm:leading-tight md:text-xl md:leading-tight lg:text-2xl lg:leading-tight'>
                {randomProject?.name ?? 'Večstanovanjskih objekt - Lenart'}
              </h3>
              <p className='w-full font-archivo text-xs leading-normal text-secondary-400 sm:text-sm'>
                {randomProject?.description ?? 'Nov, sodoben večstanovanjski objekt v Lenartu - vrhunska bivalna izkušnja v idiličnem okolju. Prijazne cene in vrhunska kakovost bivanja'}
              </p>
            </div>
            {randomProject && (
              <Link href={`/projekt/${randomProject.slug}/${randomProject.realEstates[0].id}`}>
                <Button
                  variant={'rounded'}
                  size={'rounded'}
                  className='size-[40px] min-w-[40px] self-end p-0 text-body-200 sm:size-[50px] sm:min-w-[50px] lg:self-auto'
                >
                  <ArrowUpRight className="size-4 sm:size-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
