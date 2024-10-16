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
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-primary-75 pt-6 sm:pt-10 md:pt-16 lg:pt-0'>
      <div className='container relative grid w-full justify-center gap-6 sm:gap-8 lg:w-full lg:grid-cols-2 lg:gap-10'>
        <div className='relative flex flex-col justify-center gap-4 sm:gap-5'>
          <div className='flex max-w-fit gap-2 sm:gap-[10px] rounded-xl sm:rounded-2xl bg-primary-500 px-3 sm:px-5 py-1 sm:py-2 font-archivo text-sm sm:text-base font-semibold text-body-200'>
            <DoubleChervonRightIcon />
            Pozdravljeni, najdite svoje sanje!
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-[120%] md:text-[51px] md:leading-[57px] lg:mt-2 lg:leading-[76.5px]'>
            Najdite, kupite & stanujte v svoji nepremični z nami!
          </h2>
          <p className='font-archivo text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-secondary-200'>
            Imeli boste vse pomembno v svoji bližini: trgovino, banko, pošto, šolo, vrtec, družinam
            prijazne soseske...
          </p>
          <div className='flex flex-wrap gap-4 sm:gap-5 lg:mt-3 lg:gap-10'>
            <PublicProjekti.Link>
              <ButtonWithIcon
                asChild
                variant='primary'
                className='px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl'
              >
                Akutalni projekti
              </ButtonWithIcon>
            </PublicProjekti.Link>
            <ButtonWithIcon
              variant='secondary'
              className='px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl'
            >
              Vstopite v stik
            </ButtonWithIcon>
          </div>
          <Image
            src={'/hero-pattern.webp'}
            alt='Pattern'
            width='260'
            height='230'
            className='absolute -bottom-px right-[-25px] hidden lg:block'
          />
        </div>
        <div className='relative inset-x-1/2 mx-[-50vw] flex w-screen flex-col items-center lg:inset-x-auto lg:mx-auto lg:w-full'>
          <div className='relative w-full md:flex md:flex-col md:items-center'>
            <Image
              src={randomProject?.images[0] ? `https://utfs.io/f/${randomProject?.images[0]}` : '/hero-image.webp'}
              alt='Hero image'
              width='795'
              height='700'
              className='w-full max-h-[250px] sm:max-h-[310px] object-cover md:min-h-[500px] lg:min-h-[700px]'
            />
            <span className='absolute bottom-0 left-0 bg-[#3E5566]/50 px-3 sm:px-5 py-2 sm:py-3 font-archivo text-base sm:text-xl font-bold leading-6 sm:leading-8 text-body-200 md:hidden lg:block lg:px-8 lg:py-3'>
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
          <div className='flex w-full flex-col justify-between gap-4 bg-body-100 px-4 sm:px-5 py-3 lg:flex-row lg:bg-body-75 lg:p-8'>
            <div className='flex flex-col gap-2 sm:gap-3'>
              <h3 className='text-lg sm:text-xl font-bold text-secondary-400'>
                {randomProject?.name ?? 'Večstanovanjskih objekt - Lenart'}
              </h3>
              <p className='w-full font-archivo text-sm sm:text-base leading-5 text-secondary-400'>
                {randomProject?.description ?? 'Nov, sodoben večstanovanjski objekt v Lenartu - vrhunska bivalna izkušnja v idiličnem okolju. Prijazne cene in vrhunska kakovost bivanja'}
              </p>
            </div>
            {randomProject && (
              <Link href={`/projekt/${randomProject.slug}/${randomProject.realEstates[0].id}`}>
                <Button
                  variant={'rounded'}
                  size={'rounded'}
                  className='size-[50px] sm:size-[68px] min-w-[50px] sm:min-w-[68px] self-end text-body-200 lg:self-auto'
                >
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
