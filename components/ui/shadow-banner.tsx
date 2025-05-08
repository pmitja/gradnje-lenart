'use client'

import { motion } from 'framer-motion'
import React from 'react'

type ShadowBannerProps = {
  backgroundImagePath: string
  icon: React.ReactNode
  heading: string
  subheading?: string
}

const ShadowBanner = ({ backgroundImagePath, icon, heading, subheading }: ShadowBannerProps) => {
  const titleVariants = {
    hidden: {
      opacity: 0, y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [ 0.22, 1, 0.36, 1 ],
      },
    },
  }

  const subtitleVariants = {
    hidden: {
      opacity: 0, y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [ 0.22, 1, 0.36, 1 ],
      },
    },
  }

  const iconVariants = {
    hidden: {
      opacity: 0, scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.4,
      },
    },
  }

  return (
    <div
      className="relative inset-x-1/2 mx-[-50vw] flex max-h-[35dvh] min-h-[35dvh] sm:max-h-none sm:min-h-[55rem] w-screen min-w-[100vw] items-end overflow-hidden bg-cover bg-fixed bg-center pt-10 md:pt-16 lg:pt-0"
      style={{
        backgroundImage: `url(${backgroundImagePath})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>

      <div className="container relative flex size-full flex-col items-start justify-end gap-8 overflow-hidden pb-20 lg:w-full lg:grid-cols-2 lg:gap-8 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex items-center justify-start gap-4 text-body-200"
        >
          <motion.div
            variants={iconVariants}
            className="mr-2 rounded-full bg-black/20 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 w-20 h-20 md:w-[120px] md:h-[120px]"
          >
            {icon}
          </motion.div>
          <motion.h1
            variants={titleVariants}
            className="text-4xl font-bold uppercase tracking-wide drop-shadow-lg md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h1>
        </motion.div>

        {subheading && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
            className="max-w-5xl text-3xl font-bold leading-snug text-body-200 drop-shadow-lg md:text-4xl lg:text-5xl"
          >
            {subheading}
          </motion.p>
        )}

        <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-primary-300 via-secondary-200 to-transparent"></div>
      </div>
    </div>
  )
}

export default ShadowBanner
