/* eslint-disable consistent-return */

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'

import { CardWrapper } from './card-wrapper'

function LoginForm() {
  const searchParams = useSearchParams()

  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider!'
    : ''

  const [ isPending, startTransition ] = useTransition()

  const [ error, setError ] = useState<string | undefined>('')

  const [ success, setSuccess ] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) return setError(data.error)
        if (data?.success) return setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper headerLabel='Dobrodošli!'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='john.wick@example.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geslo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='***********'
                        type='password'
                      />
                    </FormControl>
                    <Button
                      size='sm'
                      variant='link'
                      asChild
                      className='px-0'
                    >
                      <Link href='/auth/reset-password'>Pozabljeno geslo?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
            variant={'primary'}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
