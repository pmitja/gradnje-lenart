import { TriangleAlert } from 'lucide-react'

import { CardWrapper } from './card-wrapper'

export const ErrorCard = () => (
    <CardWrapper headerLabel='Oops! Something went wrong!'>
      <div className='flex w-full items-center justify-center text-red-500'>
        <TriangleAlert size={48} />
      </div>
    </CardWrapper>
)
