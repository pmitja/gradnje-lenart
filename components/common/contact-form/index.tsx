'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { sendEmail } from '@/actions/send-email'
import { Button } from '@/components/ui/button'
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { contactFormSchema } from '@/schemas'

const inputClasses = 'max-w-[20rem] rounded-none border-0 border-b border-secondary-100 bg-transparent p-0 outline-none'

const ContactForm = () => {
  const [ isPending, startTransition ] = useTransition()

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    startTransition(async () => {
      const result = await sendEmail(values)

      if ('error' in result) {
        toast.error(result.error, {
          description: 'Prosimo, poskusite znova.',
        })
      } else {
        toast.success('Sporočilo uspešno poslano!', {
          description: 'Kontaktirali vas bomo v najkrajšem možnem času.',
        })
        form.reset()
      }
    })
  }

  return (
    <div className="text-secondary-400">
      <p className="mb-3 text-2xl font-bold md:text-3xl">Kontaktiraj nas še danes</p>
      <p className="mb-3">
        Prosim izpolni spodnji obrazec s podatki, kateri se nanašajo na vaše vprašanje.
        Na vprašanje bomo odgovorili v najkrajšem možnem času.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime</FormLabel>
                <FormControl>
                  <Input className={inputClasses} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priimek</FormLabel>
                <FormControl>
                  <Input className={inputClasses} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className={inputClasses} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sporočilo</FormLabel>
                <FormControl>
                  <Textarea className={cn(inputClasses, 'border p-2 rounded-md min-h-[8rem] max-w-full focus-visible:ring-0 focus-visible:ring-offset-0')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant='primary'
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Pošiljanje...' : 'Pošlji sporočilo'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ContactForm
