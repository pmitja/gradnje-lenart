import { TriangleAlertIcon } from 'lucide-react'

type FormErrorProps = {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <div className='flex items-center gap-x-2 bg-destructive/15 p-3 text-destructive'>
      <TriangleAlertIcon size={16} />
      <span>{message}</span>
    </div>
  )
}
