'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { newPassword } from '@/actions/new-password'
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
import { NewPasswordSchema } from '@/schemas'

import { CardWrapper } from './card-wrapper'

function NewPasswordForm() {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const [ isPending, startTransition ] = useTransition()

  const [ error, setError ] = useState<string | undefined>('')

  const [ success, setSuccess ] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper headerLabel='Vnesi novo geslo'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
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
                    <FormMessage />
                  </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            Spremeni geslo
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm
