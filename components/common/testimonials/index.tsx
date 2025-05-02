'use client'

import { Star } from 'lucide-react'

import { TestimonialCard } from '@/components/ui/testimonial-card'
import { cn } from '@/lib/utils'

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: 'Presegla so naša pričakovanja z inovativnimi zasnovami, ki so našo vizijo spremenile v resničnost - resnično izjemno gradbeno podjetje.',
    author: {
      name: 'Samantha Novak',
      handle: 'Lastnica stanovanja v Ljubljani',
      avatar: '/testimonials.webp',
    },
  },
  {
    id: 2,
    text: 'Njihova sposobnost zajeti bistvo naše blagovne znamke v vsakem projektu je neprimerljiva - neprecenljiv ustvarjalni sodelavec.',
    author: {
      name: 'Marko Horvat',
      handle: 'Investitor, Maribor Center',
      avatar: '/testimonials.webp',
    },
  },
  {
    id: 3,
    text: 'Kreativni geniji, ki poslušajo, razumejo in ustvarjajo očarljive vizualne podobe - podjetje, ki resnično razume naše potrebe.',
    author: {
      name: 'Gabriela Kovač',
      handle: 'Lastnica vile na obali',
      avatar: '/testimonials.webp',
    },
  },
  {
    id: 4,
    text: 'Osvežujoče in domiselno podjetje, ki dosledno zagotavlja izjemne rezultate - toplo priporočam za vsak projekt.',
    author: {
      name: 'Viktor Tomšič',
      handle: 'Direktor nepremičninske agencije',
      avatar: '/testimonials.webp',
    },
  },
  {
    id: 5,
    text: 'Njihov umetniški občutek in strateški pristop sta privedla do izjemnih kampanj - zanesljiv ustvarjalni partner.',
    author: {
      name: 'Janez Potočnik',
      handle: 'Lastnik poslovnega prostora',
      avatar: '/testimonials.webp',
    },
  },
  {
    id: 6,
    text: 'Od koncepta do izvedbe, njihova ustvarjalnost ne pozna meja - prelomnica za uspeh naše blagovne znamke.',
    author: {
      name: 'Natalija Martinc',
      handle: 'Lastnica stanovanja v Kopru',
      avatar: '/testimonials.webp',
    },
  },
]

const Testimonials = () => (
  <section className={cn(
    ' text-secondary-300',
    'py-12 sm:py-24 md:py-32 px-0',
  )}>
    <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
      <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
        {/* Rating Badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white shadow-lg">
            <Star className="size-5 fill-primary-300 text-primary-300" />
            <span className="font-medium">Ocenjeno 4.8/5 s strani več kot 500 strank</span>
          </div>
        </div>

        <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
          Besede pohvale naših strank
        </h2>
        <p className="text-md max-w-[600px] font-medium text-secondary-200 sm:text-xl">
          Kaj pravijo naše stranke o naših nepremičninah in storitvah
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex flex-row overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]">
          {/* First copy for seamless loop */}
          <div className="flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`first-${i}`}
                author={testimonial.author}
                text={testimonial.text}
                className="mx-4"
              />
            ))}
          </div>

          {/* Second copy for seamless loop */}
          <div className="flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]" aria-hidden="true">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`second-${i}`}
                author={testimonial.author}
                text={testimonial.text}
                className="mx-4"
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-body-75 sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-body-75 sm:block" />
      </div>
    </div>
  </section>
)

export default Testimonials
