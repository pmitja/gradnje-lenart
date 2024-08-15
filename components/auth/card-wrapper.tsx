'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import SocialButtons from './social-buttons'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  buttonDisabled?: boolean
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className='flex min-h-[calc(100dvh)] w-full flex-col justify-center border-0 shadow-none sm:min-h-fit sm:w-[400px] md:border-[1px] md:shadow-md'>
      <CardHeader className='space-y-2 text-center text-3xl font-bold'>{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
