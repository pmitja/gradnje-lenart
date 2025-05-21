'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

import { StatType } from '@/components/common/stat'

interface AchievementsSectionProps {
  stats: StatType[]
}

const AchievementsSection = ({ stats }: AchievementsSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section className="py-16 md:py-24" id="achievements">
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 20,
              }
        }
        transition={{
          duration: 0.6,
        }}
        className="mx-auto text-center"
      >
        <h2 className="mb-6 text-3xl font-bold text-secondary-400 md:text-4xl">Naši dosežki</h2>
        <p className="mb-12 text-lg text-secondary-300">
          Ponosni smo na številke, ki govorijo o naši predanosti in uspehu. Z vsakim projektom
          postavljamo nove standarde kakovosti.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              transition={{
                duration: 0.5,
                delay: 0.2 * index,
              }}
              className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-75 p-8 shadow-lg"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 flex items-end text-5xl font-bold text-primary-400 md:text-6xl">
                  {inView ? (
                    <CountUp
                      end={stat.endValue}
                      duration={2.5}
                      separator={stat.isYear ? '' : '.'}
                      suffix={stat.isPercentage ? '%' : stat.isYear ? '' : ''}
                    />
                  ) : (
                    <span>0</span>
                  )}
                </div>
                <p className="text-center text-lg font-medium capitalize text-secondary-300">
                  {stat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          className="mt-12 rounded-xl bg-secondary-50 p-6 text-left shadow-sm md:p-8"
        >
          <h3 className="mb-3 text-xl font-semibold text-secondary-400">
            Zakaj te številke štejejo
          </h3>
          <p className="text-secondary-300">
            Naše statistike ne predstavljajo zgolj številk, temveč zgodbe zadovoljnih strank,
            uspešno izvedenih projektov in izkušenj, ki smo jih pridobili skozi leta delovanja na
            nepremičninskem trgu. Vsak projekt, vsaka stranka in vsaka izkušnja nas naredi boljše in
            nam pomaga, da rastemo kot podjetje, ki postavlja nove standarde na področju razvoja
            nepremičnin.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AchievementsSection
