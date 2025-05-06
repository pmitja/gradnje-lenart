import { Building, Calendar, CheckCircle, Home, Info, MapPin } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getInactiveLocations } from '@/actions/get-inactive-locations'
import ContactUs from '@/components/common/contact-us'
import ProjectsCta from '@/components/common/projects-cta'

export const metadata: Metadata = {
  title: 'Zaključeni projekti | Gradnje Plus',
  description: 'Odkrijte naše zaključene projekte in nepremičnine, ki smo jih uspešno zgradili za zadovoljne stranke.',
}

const ReferencePage = async () => {
  const inactiveLocations = await getInactiveLocations()

  // Calculate overall statistics
  const totalLocations = inactiveLocations.length

  const totalRealEstates = inactiveLocations.reduce(
    (sum, location) => sum + location.realEstates.length,
    0,
  )

  const recentYear = inactiveLocations.length > 0
    ? Math.max(...inactiveLocations.map((loc) => new Date(loc.createdAt).getFullYear()))
    : new Date().getFullYear()

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full-screen green background */}
      <div className="w-full bg-primary-75">
        <div className="absolute inset-x-0 h-[600px] w-full bg-primary-75">
          <div className="absolute inset-0 z-0 opacity-15">
            <Image
              src="/page-hero.webp"
              alt="Reference hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="container relative z-10 px-4 py-24 pt-32 sm:px-6 lg:py-28 lg:pt-36 xl:py-32 xl:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-secondary-500 md:text-5xl lg:text-6xl">
              Referenčni projekti
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary-400 md:text-xl">
              Odkrijte kakovost in inovativnost naših zaključenih nepremičninskih projektov,
              ki pričajo o naši zavezanosti odličnosti.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white/80 p-4 text-secondary-500 shadow-sm backdrop-blur-sm">
                <Building className="mx-auto mb-2 size-8 text-primary-400" />
                <div className="text-2xl font-bold md:text-3xl">{totalLocations}</div>
                <div className="text-sm text-secondary-400">Zaključenih lokacij</div>
              </div>
              <div className="rounded-lg bg-white/80 p-4 text-secondary-500 shadow-sm backdrop-blur-sm">
                <Home className="mx-auto mb-2 size-8 text-primary-400" />
                <div className="text-2xl font-bold md:text-3xl">{totalRealEstates}</div>
                <div className="text-sm text-secondary-400">Zgrajenih nepremičnin</div>
              </div>
              <div className="rounded-lg bg-white/80 p-4 text-secondary-500 shadow-sm backdrop-blur-sm">
                <Calendar className="mx-auto mb-2 size-8 text-primary-400" />
                <div className="text-2xl font-bold md:text-3xl">{recentYear}</div>
                <div className="text-sm text-secondary-400">Zadnja zaključena</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the page content in white background */}
      <div className="bg-body-50">
        {/* Projects Grid Section */}
        <section className="container px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-500 md:text-4xl">
            Zaključeni gradbeni projekti
          </h2>

          {inactiveLocations.length === 0 ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-xl bg-white p-8 text-center shadow-md">
              <Info className="mb-4 size-16 text-primary-300" />
              <h3 className="mb-2 text-xl font-bold text-secondary-500">Ni zaključenih projektov</h3>
              <p className="mb-6 text-secondary-400">
                Trenutno nimamo zaključenih projektov za prikaz.
                Preverite naše aktivne projekte, ki so v teku.
              </p>
              <Link
                href="/projekti"
                className="
                  rounded-md bg-primary-400 px-6 py-3 font-semibold text-white
                  transition hover:bg-primary-500
                "
              >
                Oglej si aktivne projekte
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {inactiveLocations.map((location) => {
                // Find the best image to display for this location
                let displayImage = ''

                // First, check if the location itself has images
                if (location.images?.length > 0) {
                  const [ firstImage ] = location.images

                  displayImage = firstImage
                } else {
                  // If not, try to find an image from any of its real estates
                  const estateWithImage = location.realEstates.find(
                    (estate) => estate.images?.length > 0,
                  )

                  if (estateWithImage?.images?.length) {
                    const [ firstImage ] = estateWithImage.images

                    displayImage = firstImage
                  }
                }

                return (
                  <div
                    key={location.id}
                    className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-56 w-full overflow-hidden sm:h-48 md:h-52 lg:h-56 xl:h-64">
                      {displayImage ? (
                        <Image
                          src={`https://utfs.io/f/${displayImage}`}
                          alt={location.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-primary-50">
                          <Building className="size-16 text-primary-300 sm:size-12 md:size-14 lg:size-16" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary-500/90 to-transparent p-4 pt-12">
                        <span className="rounded bg-primary-200 px-2 py-1 text-xs font-semibold text-secondary-500">
                          {new Date(location.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="mb-2 text-xl font-bold text-secondary-500">
                        {location.name}
                      </h3>

                      <div className="mb-3 flex items-center text-sm text-secondary-400 sm:text-base">
                        <MapPin className="mr-2 size-4" />
                        <span>{location.city}, {location.address}</span>
                      </div>

                      {location.description && (
                        <p className="mb-4 text-sm text-secondary-300 sm:text-base">
                          {location.description.length > 100
                            ? `${location.description.substring(0, 100)}...`
                            : location.description}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-secondary-400">
                          <Home className="mr-2 size-4 sm:size-5" />
                          <span className="text-base font-semibold sm:text-lg">{location.realEstates.length}</span>
                          <span className="ml-1 text-sm sm:text-base">nepremičnin</span>
                        </div>

                        <div className="flex items-center text-sm text-primary-300 sm:text-base">
                          <CheckCircle className="mr-1 size-4" />
                          <span>Zaključeno</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Timeline Section */}
        <section className="bg-secondary-50 py-16 lg:py-24">
          <div className="container px-4 sm:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-secondary-500 md:text-4xl">
              Zgodovina projektov
            </h2>

            {inactiveLocations.length === 0 ? (
              <div className="mx-auto flex max-w-2xl flex-col items-center rounded-xl bg-white p-8 text-center shadow-md">
                <Calendar className="mb-4 size-16 text-primary-300" />
                <h3 className="mb-2 text-xl font-bold text-secondary-500">Ni zgodovine projektov</h3>
                <p className="text-secondary-400">
                  Zgodovina projektov bo prikazana, ko bodo projekti zaključeni.
                </p>
              </div>
            ) : (
              <div className="relative mx-auto max-w-4xl">
                {/* Timeline line */}
                <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-300 md:left-1/2 md:-ml-0.5"></div>

                {inactiveLocations
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 6) // limit to 6 most recent projects
                  .map((location, index) => (
                    <div
                      key={location.id}
                      className={`relative mb-10 flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className="ml-16 w-full md:ml-0 md:w-1/2 md:px-8">
                        <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
                          <span className="inline-block rounded bg-primary-100 px-2 py-1 text-xs font-semibold text-secondary-500">
                            {new Date(location.createdAt).getFullYear()}
                          </span>
                          <h3 className="mt-2 text-lg font-bold text-secondary-500 sm:text-xl">
                            {location.name}
                          </h3>
                          <div className="mt-2 flex items-center text-xs text-secondary-400 sm:text-sm">
                            <MapPin className="mr-2 size-3 sm:size-4" />
                            <span>{location.city}</span>
                          </div>
                          <div className="mt-3 flex items-center text-xs text-secondary-400 sm:text-sm">
                            <Home className="mr-2 size-3 sm:size-4" />
                            <span>
                              {location.realEstates.length} {location.realEstates.length === 1 ? 'nepremičnina' : 'nepremičnin'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline bullet */}
                      <div className="absolute left-5 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary-300 text-white md:left-1/2 md:-ml-5">
                        <Building className="size-4 sm:size-5" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Projects CTA */}
        <section className="py-12 lg:py-16">
          <div className="container px-4 sm:px-6">
            <ProjectsCta
              title="Poglejte naše aktivne projekte"
              description="Odkrijte naše trenutne gradbene projekte in nepremičnine, ki so na voljo za nakup."
              buttonText="Aktivni projekti"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="container px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-500 md:text-4xl">
            Stopite v stik
          </h2>
          <ContactUs />
        </section>
      </div>
    </div>
  )
}

export default ReferencePage
