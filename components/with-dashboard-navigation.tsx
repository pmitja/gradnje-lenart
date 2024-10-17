'use client'

import { Location } from '@prisma/client'
import { ArchiveIcon,
  ArrowBigLeft,
  DoorOpenIcon,
  Menu,
  RssIcon,
  SquarePlusIcon,
  StickyNoteIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import LogoutButton from '@/components/auth/logout-button'
import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ProtectedNadzornaPlosca, ProtectedNadzornaPloscaAktualniProjektNov, ProtectedNadzornaPloscaAktualniProjektSlug, Public } from '@/routes'

const WithDashBoardNavigation = ({
  children,
  activeNavItems,
  finishedNavItems,
}: {
  children: React.ReactNode
  activeNavItems: Location[]
  finishedNavItems?: Location[]
}) => {
  const SidebarContent = () => (
    <div className="fixed flex h-full max-h-screen min-w-[279px] flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <ProtectedNadzornaPlosca.Link className="flex items-center gap-2 font-semibold">
          <Image src={'/gradnje-plus-logo.webp'} alt="Logo" width={200} height={32} />
        </ProtectedNadzornaPlosca.Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
          <Accordion type="single" collapsible className="w-full max-w-[245px]">
            <div className="border-b">
              <Public.Link className="group flex flex-1 items-center justify-between px-3 py-4 text-start font-medium transition-all">
                <ArrowBigLeft /> Nazaj na stran
              </Public.Link>
            </div>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <DoorOpenIcon /> Aktualni projekti
              </AccordionTrigger>
              <AccordionContent>
                <ProtectedNadzornaPloscaAktualniProjektNov.Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                >
                  Nov vnos
                </ProtectedNadzornaPloscaAktualniProjektNov.Link>
                {activeNavItems
                  && activeNavItems.map((location) => (
                    <ProtectedNadzornaPloscaAktualniProjektSlug.Link
                      slug={location.slug}
                      key={location.slug}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                    >
                      {location.name}
                    </ProtectedNadzornaPloscaAktualniProjektSlug.Link>
                  ))}
              </AccordionContent>
            </AccordionItem>
            {finishedNavItems && <AccordionItem value="item-2">
              <AccordionTrigger>
                <ArchiveIcon /> Pretekli projekti
              </AccordionTrigger>
              <AccordionContent>
              {finishedNavItems
                  && finishedNavItems.map((location) => (
                    <ProtectedNadzornaPloscaAktualniProjektSlug.Link
                      key={location.slug}
                      slug={location.slug}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                    >
                      {location.name}
                    </ProtectedNadzornaPloscaAktualniProjektSlug.Link>
                  ))}
              </AccordionContent>
            </AccordionItem>}
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <RssIcon />
                Blog objave
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                >
                  <StickyNoteIcon className="size-4" />
                  Pregled
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                >
                  <SquarePlusIcon className="size-4" />
                  Dodaj blog objavo
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ProtectedNadzornaPloscaAktualniProjektNov.Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
          >
            <SquarePlusIcon className="size-6" />
            Dodaj nov projekt
          </ProtectedNadzornaPloscaAktualniProjektNov.Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <LogoutButton>Izpis</LogoutButton>
      </div>
    </div>
  )

  return (
    <main>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <SidebarContent />
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex flex-1 items-start justify-start" x-chunk="dashboard-02-chunk-1">
              {children}
            </div>
          </main>
        </div>
      </div>
    </main>
  )
}

export default WithDashBoardNavigation
