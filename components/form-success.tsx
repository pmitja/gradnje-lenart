import { BadgeCheck } from 'lucide-react'

type FormSuccessProps = {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null
  return (
    <div className='flex items-center bg-emerald-500/15 p-3 gap-x-2 text-emerald-500'>
      <BadgeCheck size={16} />
      <span>{message}</span>
    </div>
  )
}