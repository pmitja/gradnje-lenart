'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export interface Milestone {
  year: number
  title: string
  description: string
}

interface TimelineSectionProps {
  milestones: Milestone[]
}

const TimelineSection = ({ milestones }: TimelineSectionProps) => {
  const [ activeIndex, setActiveIndex ] = useState(milestones.length - 1)

  const [ ref, inView ] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const handleNext = () => {
    setActiveIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <section className="bg-body-75 py-16 md:py-24" id="timeline">
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
          className="mx-auto max-w-6xl"
        >
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-secondary-400 md:text-4xl">
              Naša zgodovina
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-secondary-300">
              Spoznajte ključne trenutke, ki so oblikovali našo pot in nas naredili vodilno
              podjetje na področju nepremičnin.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative mb-16">
              {/* Timeline track */}
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-secondary-75"></div>

              {/* Timeline nodes */}
              <div className="relative flex justify-between">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0, scale: 0.8,
                    }}
                    animate={
                      inView
                        ? {
                          opacity: 1, scale: 1,
                        }
                        : {
                          opacity: 0, scale: 0.8,
                        }
                    }
                    transition={{
                      duration: 0.5, delay: index * 0.1,
                    }}
                    className="relative"
                    style={{
                      zIndex: index === activeIndex ? 10 : 1,
                    }}
                  >
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex size-10 items-center justify-center rounded-full border-4 transition-all ${
                        index === activeIndex
                          ? 'border-primary-300 bg-primary-300'
                          : 'border-secondary-100 bg-body-50'
                      }`}
                    >
                      <span
                        className={`absolute -bottom-8 text-sm font-bold ${
                          index === activeIndex
                            ? 'text-primary-400'
                            : 'text-secondary-200'
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active milestone content */}
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0, y: 20,
              }}
              animate={{
                opacity: 1, y: 0,
              }}
              exit={{
                opacity: 0, y: -20,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mx-auto max-w-2xl rounded-xl bg-body-50 p-8 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-secondary-400">
                  {milestones[activeIndex].title}
                </h3>
                <span className="rounded-full bg-primary-75 px-4 py-1 text-sm font-medium text-primary-400">
                  {milestones[activeIndex].year}
                </span>
              </div>
              <p className="text-lg text-secondary-300">
                {milestones[activeIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            <div className="relative mb-8">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`flex size-10 items-center justify-center rounded-full ${
                    activeIndex === 0
                      ? 'bg-secondary-50 text-secondary-100'
                      : 'bg-primary-75 text-primary-400'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-secondary-400">
                    {milestones[activeIndex].year}
                  </h4>
                </div>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === milestones.length - 1}
                  className={`flex size-10 items-center justify-center rounded-full ${
                    activeIndex === milestones.length - 1
                      ? 'bg-secondary-50 text-secondary-100'
                      : 'bg-primary-75 text-primary-400'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0, x: 20,
              }}
              animate={{
                opacity: 1, x: 0,
              }}
              exit={{
                opacity: 0, x: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="rounded-xl bg-body-50 p-6 shadow-lg"
            >
              <h3 className="mb-3 text-xl font-bold text-secondary-400">
                {milestones[activeIndex].title}
              </h3>
              <p className="text-secondary-300">
                {milestones[activeIndex].description}
              </p>
            </motion.div>

            {/* Pagination indicators */}
            <div className="mt-6 flex justify-center space-x-2">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`size-2 rounded-full ${
                    index === activeIndex
                      ? 'bg-primary-300'
                      : 'bg-secondary-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineSection
