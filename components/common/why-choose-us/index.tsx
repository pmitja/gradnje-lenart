'use client'

import { LeafIcon, LocateIcon, RocketIcon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'

// Custom icons for the features
const FeatureIcon = ({ name }: { name: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    sparkle: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    shield: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    leaf: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 21C7.5 19.4 9 17.9 9 16C9 14.1 7.9 13 6 13C4.1 13 3 14.1 3 16C3 17.9 4.5 19.4 6 21Z" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 13C6 9.7 7.4 6.6 10 4.5C12.6 2.4 16 2 19 2C19 5 18.6 8.4 16.5 11C14.4 13.6 11.3 15 8 15" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    building: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V2H18V22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 22H22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 10H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 6H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    diamond: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="#6c914e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }

  return iconMap[name] || null
}

export default function WhyChooseUs() {
  return (
    <section className=" py-20">
        <div className="mb-6 flex">
          <div className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white shadow-lg">
            <span className="font-medium">Zakaj izbrati nas?</span>
          </div>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Zakaj <span className="text-primary-300">Gradnje Plus</span> je prava izbira za vas
          </h2>
          <p className="max-w-md text-secondary-200">
            Ustvarjamo prostore, ki navdihujejo, z inovativnim pristopom in predanostjo kakovosti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* First column - small cards */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-primary-50 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white p-4">
                <RocketIcon className="size-6 text-secondary-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-300">Inovativna arhitektura</h3>
              <p className="text-secondary-200">
                Ustvarjamo sodobne, energetsko učinkovite domove, ki združujejo estetiko in
                funkcionalnost za sodobno bivanje.
              </p>
            </div>

            <div className="rounded-3xl bg-primary-75 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white p-4">
                <ShieldCheckIcon className="size-6 text-secondary-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-300">Vrhunska kakovost</h3>
              <p className="text-secondary-200">
                Uporabljamo premium materiale in napredne gradbene tehnike, ki zagotavljajo
                dolgoročno vrednost vaše nepremičnine.
              </p>
            </div>
          </div>

          {/* Second column - tall card */}
          <div className="flex flex-col gap-4">
            <div className="h-full rounded-3xl bg-primary-300 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <FeatureIcon name="building" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Lokalna prisotnost</h3>
              <p className="text-white/90">
                Kot slovensko podjetje razumemo lokalni trg in predpise, kar omogoča gladek in
                učinkovit gradbeni proces.
              </p>
            </div>
          </div>

          {/* Third column - small card and large card */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-primary-50 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white p-4">
                <FeatureIcon name="users" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-300">Strokovni tim</h3>
              <p className="text-secondary-200">
                Naša ekipa arhitektov in inženirjev ima več kot 20 let izkušenj v oblikovanju in
                gradnji prestižnih nepremičnin.
              </p>
            </div>

            <div className="rounded-3xl bg-primary-75 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <LocateIcon className="size-6 text-secondary-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-300">Premium lokacije</h3>
              <p className="text-secondary-200">
                Naše nepremičnine se nahajajo na skrbno izbranih lokacijah, ki zagotavljajo
                odlično kakovost življenja in dolgoročno vrednost.
              </p>
            </div>
          </div>

          {/* Full width card */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-3xl bg-primary-50 p-8">
              <div className="mb-4 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <LeafIcon className="size-6 text-secondary-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-secondary-300">Trajnostna gradnja</h3>
              <p className="text-secondary-200">
                Naše nepremičnine so zasnovane z mislijo na okolje - nižji stroški energije in
                manjši okoljski odtis.
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}
