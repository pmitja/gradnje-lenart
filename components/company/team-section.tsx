'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface TeamSectionProps {
  culture: string
}

const TeamSection = ({ culture }: TeamSectionProps) => {
  const [ ref, inView ] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section className="py-16 md:py-24" id="team">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{
            opacity: 0, y: 20,
          }}
          animate={inView ? {
            opacity: 1, y: 0,
          } : {
            opacity: 0, y: 20,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-secondary-400 md:text-4xl">
              Kultura in vrednote
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            <motion.div
              initial={{
                opacity: 0, x: -20,
              }}
              animate={inView ? {
                opacity: 1, x: 0,
              } : {
                opacity: 0, x: -20,
              }}
              transition={{
                duration: 0.6, delay: 0.2,
              }}
              className="flex-1"
            >
              <div className="rounded-xl bg-gradient-to-r from-primary-200 to-primary-400 p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Naša filozofija
                </h3>
                <p className="text-lg leading-relaxed text-white">
                  {culture}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0, x: 20,
              }}
              animate={inView ? {
                opacity: 1, x: 0,
              } : {
                opacity: 0, x: 20,
              }}
              transition={{
                duration: 0.6, delay: 0.4,
              }}
              className="flex-1"
            >
              <div className="mb-8 rounded-xl bg-body-75 p-8 shadow-md">
                <h4 className="mb-4 text-xl font-semibold text-secondary-400">
                  Naša zaveza strankam
                </h4>
                <ul className="space-y-3 text-secondary-300">
                  <li className="flex items-start">
                    <svg
                      className="mr-2 size-5 shrink-0 text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Kakovost brez kompromisov</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 size-5 shrink-0 text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Transparentnost v vseh postopkih</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 size-5 shrink-0 text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Inovativne rešitve za vaše potrebe</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-body-75 p-8 shadow-md">
                <h4 className="mb-4 text-xl font-semibold text-secondary-400">
                  Trajnostna prizadevanja
                </h4>
                <p className="text-secondary-300">
                  Zavezani smo k zmanjšanju našega okoljskega odtisa in
                  spodbujanju trajnostnih praks v gradbeništvu.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
