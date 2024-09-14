'use client'

import React from 'react'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const LogoutButton = ({ children }: { children: React.ReactNode }) => (
    <Button
      variant={'primary'}
      onClick={() => logout()}
    >
      {children}
    </Button>
)

export default LogoutButton
