'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CardWrapper } from './card-wrapper'

interface PasswordProtectedWrapperProps {
  children: React.ReactNode
  pagePassword: string
}

const PasswordProtectedWrapper = ({
  children,
  pagePassword
}: PasswordProtectedWrapperProps) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === pagePassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <CardWrapper headerLabel='Protected Area'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Page Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              type='password'
            />
          </div>
        </div>
        <FormError message={error} />
        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
    </CardWrapper>
  )
}

export default PasswordProtectedWrapper 