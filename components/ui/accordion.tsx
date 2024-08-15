'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { CirclePlus, CircleMinus } from 'lucide-react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between px-3 py-4 text-start font-medium transition-all data-[state=open]:rounded-t-lg data-[state=open]:border-none data-[state=open]:bg-[#AEA490]/30 data-[state=open]:font-bold',
        className
      )}
      {...props}
    >
      {children}
      <CirclePlus className='h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden' />
      <CircleMinus className='h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden px-3 pt-3 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:rounded-b-lg data-[state=open]:bg-[#AEA490]/30',
      className
    )}
    {...props}
  >
    <div className='pb-4 pt-0'>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
