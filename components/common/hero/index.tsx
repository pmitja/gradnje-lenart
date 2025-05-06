'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'Kakovostna gradnja',
    description: 'Uporabljamo najnovejše tehnologije in kakovostne materiale za dolgotrajno vrednost.',
    icon: Building,
  },
  {
    title: 'Strokovnost',
    description: 'Naša ekipa izkušenih strokovnjakov vam zagotavlja najboljšo podporo.',
    icon: Users,
  },
  {
    title: 'Zanesljivost',
    description: 'Gradimo z mislijo na prihodnost in z odgovornostjo do okolja.',
    icon: Shield,
  },
]

export default function Hero() {
  return (
    <div className="relative inset-x-1/2 mx-[-50vw] min-h-[60dvh] w-screen pt-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-1.webp"
          alt="Modern Apartment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />s
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full min-h-[60dvh] flex-col justify-between gap-8 px-4 pt-32 sm:px-10 lg:px-8">
        <div className="max-w-4xl space-y-12 py-20">
          {/* Main Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{
                opacity: 0, y: 20,
              }}
              animate={{
                opacity: 1, y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Vaš zaupanja vreden partner
              <span className="mt-2 block bg-gradient-to-r from-white to-gray-300 bg-clip-text font-medium leading-[1.09] text-transparent">
                pri gradnji vašega doma
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0, y: 20,
              }}
              animate={{
                opacity: 1, y: 0,
              }}
              transition={{
                duration: 0.8, delay: 0.2,
              }}
              className="max-w-xl text-lg leading-relaxed text-gray-200"
            >
              Z našimi storitvami vam pomagamo uresničiti sanje o lastnem domu.
              Odkrijte naše aktualne projekte in začnite svojo pot do nove nepremičnine.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0, y: 20,
              }}
              animate={{
                opacity: 1, y: 0,
              }}
              transition={{
                duration: 0.8, delay: 0.4,
              }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/projekti">
                <Button
                  variant="secondary"
                  className="group border-2 border-white text-white hover:bg-white/10"
                >
                  Aktualni projekti
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  variant="primary"
                  className="group bg-white text-black hover:bg-white/90"
                >
                  Kontaktirajte nas
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div
            initial={{
              opacity: 0, y: 20,
            }}
            animate={{
              opacity: 1, y: 0,
            }}
            transition={{
              duration: 0.8, delay: 0.6,
            }}
            className="mt-12"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="flex items-start gap-4 text-white">
                    <div className="rounded-lg bg-white/10 p-2">
                      <feature.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="mt-1 text-sm text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
