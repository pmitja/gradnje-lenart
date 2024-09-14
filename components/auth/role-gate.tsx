'use client'

import { UserRole } from '@prisma/client'
import React from 'react'

import { FormError } from '@/components/form-error'
import { useCurrentRole } from '@/hooks/use-current-role'

type RoleGateProps = {
  children: React.ReactNode
  allowedRoles: UserRole
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const currentRole = useCurrentRole()

  if (currentRole === allowedRoles) {
    return <>{children}</>
  }

  return <FormError message='You are not authorized to view this page.' />
}
