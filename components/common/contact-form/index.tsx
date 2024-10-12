'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const inputClasses = 'max-w-[20rem] rounded-none border-0 border-b border-secondary-100 bg-transparent p-0 outline-none'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Ime mora vsebovati vsaj 2 znaka',
  }).max(50),
  surname: z.string().min(2, {
    message: 'Priimek mora vsebovati vsaj 2 znaka',
  }).max(50),
  email: z.string().email({
    message: 'Vnesite veljaven elektronski naslov',
  }),
  message: z.string().min(10, {
    message: 'Sporočilo mora vsebovati vsaj 10 znakov',
  }),
})

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="text-secondary-400">
      <p className="mb-3 md:text-3xl text-2xl font-bold">Kontaktiraj nas še danes</p>
      <p className="mb-3">
        Prosim izpolni spodnji obrazec s podatki, kateri se nanašajo na vas in na vačo vprašanje. Na
        vaše vprašanje bomo odgovorili v najkrajšem možnem času.
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
            className="rounded-sm bg-primary-300 px-12 py-6 text-secondary-50 hover:bg-primary-400"
            type="submit"
          >
            Pošlji sporočilo
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ContactForm
