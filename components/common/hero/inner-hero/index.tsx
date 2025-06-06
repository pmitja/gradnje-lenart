import { Sparkle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const InnerHero = ({ title }: { title: string }) => (
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover pt-10 md:pt-16 lg:pt-8'>
      <div className='container relative flex w-full flex-col items-center justify-center gap-8 pb-8 lg:w-full lg:grid-cols-2 lg:gap-5 lg:pb-28 lg:pt-20'>
        <Badge className='bg-white/10 text-secondary-200 backdrop-blur-sm transition-all'>
          <Sparkle />
          Aktualni projekt
        </Badge>
        <h1 className='text-center text-3xl font-bold sm:text-4xl lg:mt-2 lg:max-w-[75%] lg:text-4xl lg:leading-tight xl:text-5xl'>
          {title}
        </h1>
        <p className="text-center font-archivo text-sm leading-normal text-secondary-200 sm:text-base sm:leading-relaxed md:text-lg lg:max-w-[60%]">
          Naše strokovno znanje nam omogoča, da vam ponudimo domove, ki ne le ustrezajo vašemu
          življenjskemu slogu, ampak tudi uresničujejo vaše ambicije.
        </p>
      </div>
    </div>
)

export default InnerHero
