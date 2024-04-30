import React from 'react'
import { CardWrapper } from './card-wrapper'

function LoginForm() {
  return (
    <CardWrapper
      headerLabel='Welcome back!'
      backButtonLabel="Don't have an account? Register here."
      backButtonHref='/auth/register'
      showSocial
    >
      Login form!
    </CardWrapper>
  )
}

export default LoginForm