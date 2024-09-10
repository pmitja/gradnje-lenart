import { Sparkle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const InnerHero = () => (
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen min-w-[100vw] bg-hero-page bg-cover pt-10 md:pt-16 lg:pt-0'>
      <div className='container relative flex w-full flex-col items-center justify-center gap-8 pb-8 lg:w-full lg:grid-cols-2 lg:gap-5 lg:pb-28 lg:pt-20'>
        <Badge>
          <Sparkle />
          Aktualni projekti
        </Badge>
        <h2 className='text-center text-4xl font-bold leading-[120%] md:text-[51px] md:leading-[57px] lg:mt-2 lg:max-w-[75%] lg:text-[67px] lg:leading-[100.5px]'>
          Odprite vrata v vaš nov čudovit dom
        </h2>
        <p className='text-center font-archivo text-lg leading-6 text-secondary-200 lg:max-w-[60%] lg:text-xl lg:leading-8'>
          Naše strokovno znanje nam omogoča, da vam ponudimo domove, ki ne le ustrezajo vašemu
          življenjskemu slogu, ampak tudi uresničujejo vaše ambicije.
        </p>
      </div>
    </div>
)

export default InnerHero
