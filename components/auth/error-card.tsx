import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { BackButton } from '@/components/auth/back-button'
import { CardWrapper } from './card-wrapper'
import { TriangleAlert } from 'lucide-react'

export const ErrorCard = () => {
  return (
    <CardWrapper headerLabel='Oops! Something went wrong!'>
      <div className='flex w-full items-center justify-center text-red-500'>
        <TriangleAlert size={48} />
      </div>
    </CardWrapper>
  )
}
