'use client'

import { Location } from '@prisma/client'
import { ArchiveIcon,
  ArrowBigLeft,
  DoorOpenIcon,
  Home,
  LineChart,
  Menu,
  Package,
  RssIcon,
  ShoppingCart,
  SquarePlusIcon,
  StickyNoteIcon,
  Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import LogoutButton from '@/components/auth/logout-button'
import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Public } from '@/routes'

const WithDashBoardNavigation = ({
  children,
  navItems,
}: {
  children: React.ReactNode
  navItems: Location[]
}) => {
  const SidebarContent = () => (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/nadzorna-plosca" className="flex items-center gap-2 font-semibold">
          <Image src={'/gradnje-plus-logo.webp'} alt="Logo" width={200} height={32} />
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
          <Accordion type="single" collapsible className="w-full">
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
                <Link
                  href={'/nadzorna-plosca/aktualni-projekt/nov'}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  Nov vnos
                </Link>
                {navItems
                  && navItems.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/nadzorna-plosca/aktualni-projekt/${location.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      {location.name}
                    </Link>
                  ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <ArchiveIcon /> Pretekli projekti
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="size-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShoppingCart className="size-4" />
                  Orders
                  <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Package className="size-4" />
                  Products{' '}
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="size-4" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="size-4" />
                  Analytics
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <RssIcon />
                Blog objave
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <StickyNoteIcon className="size-4" />
                  Pregled
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <SquarePlusIcon className="size-4" />
                  Dodaj blog objavo
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="/nadzorna-plosca/aktualni-projekt/nov"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <SquarePlusIcon className="size-6" />
            Dodaj nov projekt
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardContent className="p-2 pt-0 md:p-4">
            <LogoutButton>Logout</LogoutButton>
          </CardContent>
        </Card>
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
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
