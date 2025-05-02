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

      {/* Hero Content */}
      <div className="container relative z-[1] mx-auto flex h-full min-h-[60dvh] flex-col justify-between gap-8 px-6 pt-32 sm:px-10 lg:px-20">
        <motion.div
          initial={{
            opacity: 0, y: 20,
          }}
          animate={{
            opacity: 1, y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            Vaš zaupanja vreden partner
            <br />
            <span className="font-medium">pri gradnji vašega doma</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-200">
            Z našimi storitvami vam pomagamo uresničiti sanje o lastnem domu.
            Odkrijte naše aktualne projekte in začnite svojo pot do nove nepremičnine.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/projekti">
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-white bg-transparent text-white transition-all hover:bg-white hover:text-black"
              >
                Aktualni projekti
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button
                variant="default"
                size="lg"
                className="group bg-white text-black transition-all hover:bg-white/90"
              >
                Kontaktirajte nas
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{
            opacity: 0, y: 20,
          }}
          animate={{
            opacity: 1, y: 0,
          }}
          transition={{
            duration: 0.8, delay: 0.3,
          }}
          className="pb-10"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 text-white"
              >
                <feature.icon className="mt-1 size-6 shrink-0" />
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
