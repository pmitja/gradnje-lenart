'use client'

import { socialLogin } from '@/actions/social-login'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

function SocialButtons() {
  const onClick = (provider: 'google' | 'github') => {
    socialLogin(provider)
  }
  return (
    <div className='flex w-full items-center gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('google')}
      >
        <FcGoogle className='size-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('github')}
      >
        <FaGithub className='size-5' />
      </Button>
    </div>
  )
}

export default SocialButtons
