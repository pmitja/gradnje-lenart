'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  vision: string
  strategy: string
}

const HeroSection = ({ vision, strategy }: HeroSectionProps) => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="flex flex-col items-center text-center"
    >
      <h2 className="mb-6 max-w-4xl text-3xl font-bold text-secondary-400 md:text-5xl">{vision}</h2>
      <div className="relative mx-auto mb-8 h-1 w-24 bg-primary-300"></div>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.6,
        }}
        className="mb-8 max-w-4xl text-lg leading-relaxed text-secondary-300 md:text-xl"
      >
        {strategy}
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.6,
          duration: 0.4,
        }}
        className="flex flex-wrap justify-center gap-6 md:flex-row"
      >
        <div className="flex flex-col items-center rounded-lg bg-body-50 p-6 shadow-md transition-transform hover:scale-105 lg:p-8">
          <div className="mb-4 rounded-full bg-primary-75 p-3">
            <svg
              className="size-6 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-secondary-400">Inovativnost</h3>
          <p className="text-center text-secondary-300">
            Nenehno iščemo nove pristope in rešitve za sodoben način bivanja.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-body-50 p-6 shadow-md transition-transform hover:scale-105 lg:p-8">
          <div className="mb-4 rounded-full bg-primary-75 p-3">
            <svg
              className="size-6 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-secondary-400">Zanesljivost</h3>
          <p className="text-center text-secondary-300">
            Gradimo na zaupanju in vedno izpolnimo svoje obljube.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-body-50 p-6 shadow-md transition-transform hover:scale-105 lg:p-8">
          <div className="mb-4 rounded-full bg-primary-75 p-3">
            <svg
              className="size-6 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-secondary-400">Trajnost</h3>
          <p className="text-center text-secondary-300">
            Gradimo za prihodnost z okolju prijaznimi materiali in tehnologijami.
          </p>
        </div>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.9,
        duration: 0.6,
      }}
      className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center md:bottom-6"
    >
      <div className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-secondary-300">
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="size-2 rounded-full bg-secondary-300"
        />
      </div>
    </motion.div>
  </section>
)

export default HeroSection
