import { Mail, MoveUpRight } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Cta = () => (
    <section className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-primary-100 pb-3 md:pb-0'>
      <div className='container grid w-full grid-cols-1 md:grid-cols-2 md:justify-between md:gap-16'>
        <Image
          src={'/cta-image.webp'}
          alt='Cta'
          width={1920}
          height={1080}
          className='md:max-h-auto relative inset-x-1/2 mx-[-50vw] aspect-square max-h-[300px] min-w-[100vw] object-cover md:inset-x-auto md:mx-auto md:min-h-[460px] md:min-w-0'
        />
        <div className='mt-8 flex flex-col justify-center gap-6 md:flex-col-reverse'>
          <div className='flex max-h-[60px] items-center justify-between gap-3 rounded-2xl border-4 border-secondary-100 px-3 py-2 md:row-start-3 md:max-w-[75%]'>
            <Mail className='text-body-200' />
            <Input
              placeholder='Vaš elektronski naslov'
              className='border-none bg-primary-100'
            />
            <Button
              variant={'rounded'}
              size={'rounded'}
              className='size-6 bg-body-300 text-secondary-300'
            >
              <MoveUpRight className='size-6 min-w-6' />
            </Button>
          </div>
          <div className='flex flex-col gap-6'>
            <h2 className='self-center text-3xl font-bold text-body-200 lg:text-[38px] lg:leading-[57px]'>
              Prijavite se za najnovejše projekte
            </h2>
            <p className='text-base leading-5 text-secondary-300'>
              Nikar ne zamudite prihodnjih projektov! Prijavite se na našo listo obveščanja in
              bodite med prvimi, ki bodo izvedeli o naših novih nepremičninskih projektih.
            </p>
          </div>
        </div>
      </div>
    </section>
)

export default Cta
