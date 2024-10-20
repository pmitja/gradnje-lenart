'use client'

import React from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  buttonDisabled?: boolean
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => (
    <Card className='my-6 flex min-h-[calc(100dvh)] w-full flex-col justify-center self-center border-0 shadow-none sm:min-h-fit sm:w-[400px] md:border md:shadow-md'>
      <CardHeader className='space-y-2 text-center text-3xl font-bold'>{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
)
