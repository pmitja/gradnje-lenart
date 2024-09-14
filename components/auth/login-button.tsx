'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type LoginButtonProps = {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
}

function LoginButton({ children, mode = 'redirect' }: LoginButtonProps) {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return <div>TODO: Do modal</div>
  }

  return (
    <div
      onClick={onClick}
      className='cursor-pointer rounded-md bg-primary p-2 px-4 text-white hover:bg-primary/80 dark:bg-white dark:text-black'
    >
      {children}
    </div>
  )
}

export default LoginButton
