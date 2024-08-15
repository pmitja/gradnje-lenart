'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      variant={'primary'}
      onClick={() => logout()}
    >
      {children}
    </Button>
  )
}

export default LogoutButton
