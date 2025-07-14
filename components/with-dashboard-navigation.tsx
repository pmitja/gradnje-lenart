  'use client'

  import { Location } from '@prisma/client'
  import { ArchiveIcon,
    ArrowBigLeft,
    BadgeEuro,
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
  import { ProtectedNadzornaPlosca, Public } from '@/routes'

  interface WithDashBoardNavigationProps {
    children: React.ReactNode
    activeNavItems: Location[]
    finishedNavItems?: Location[]
    userRole: string
  }

  const WithDashBoardNavigation: React.FC<WithDashBoardNavigationProps> = ({
    children,
    activeNavItems,
    finishedNavItems,
    userRole,
  }) => {
    const isAdmin = userRole === 'ADMIN'

    const SidebarContent = () => (
      <div className="fixed flex h-full max-h-screen min-w-[279px] flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={'/nadzorna-plosca'} className="flex items-center gap-2 font-semibold">
            <Image src={'/gradnje-plus-logo.webp'} alt="Logo" width={200} height={32} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
            <Accordion type="single" collapsible className="w-full max-w-[245px]">
              <div className="border-b">
                <Link href={Public()} className="group flex flex-1 items-center justify-between px-3 py-4 text-start font-medium transition-all">
                  <ArrowBigLeft /> Nazaj na stran
                </Link>
              </div>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <DoorOpenIcon /> Aktualni projekti
                </AccordionTrigger>
                <AccordionContent>
                  {isAdmin && (
                    <Link
                      href={'/nadzorna-plosca/aktualni-projekt/nov'}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                    >
                      Nov vnos
                    </Link>
                  )}
                  {activeNavItems
                    && activeNavItems.map((location) => (
                      <Link
                        href={`/nadzorna-plosca/aktualni-projekt/${location.slug}`}
                        key={location.slug}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                      >
                        {location.name}
                      </Link>
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
                      <Link
                        href={`/nadzorna-plosca/aktualni-projekt/${location.slug}`}
                        key={location.slug}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
                      >
                        {location.name}
                      </Link>
                    ))}
                </AccordionContent>
              </AccordionItem>}
              {isAdmin && (
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
              )}
              <AccordionItem value="item-4">
            <Link
              href={'/nadzorna-plosca/recent-sales'}
              className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:!text-primary-200"
            >
              <BadgeEuro className="size-6" />
              Nedavne prodaje
            </Link>
            </AccordionItem>
            </Accordion>
            
            {isAdmin && (
              <Link
                href={'/nadzorna-plosca/aktualni-projekt/nov'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:!text-primary-200"
              >
                <SquarePlusIcon className="size-6" />
                Dodaj nov projekt
              </Link>
            )}
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
