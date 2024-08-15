'use client'

import { useRouter } from 'next/navigation'

type LoginButtonProps = {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

function LoginButton({ children, mode = 'redirect', asChild }: LoginButtonProps) {
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
