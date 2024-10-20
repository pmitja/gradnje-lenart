'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { addToWaitlist } from '@/actions/waitlist'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
})

interface WaitingListDialogProps {
  realEstateId: string
  children: React.ReactNode
}

const WaitingListDialog: React.FC<WaitingListDialogProps> = ({ realEstateId, children }) => {
  const router = useRouter()

  const [ isOpen, setIsOpen ] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await addToWaitlist(values.email, realEstateId)

    if (result.success) {
      setIsOpen(false)
      toast.success('Dodano na čakalno listo!', {
        description: 'Obvestili vas bomo o morebitnih spremembah.',
      })
      router.refresh()
    } else {
      toast.error('Napaka pri dodajanju na čakalno listo!', {
        description: 'Prosimo, poskusite znova.',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prijava na čakalno listo</DialogTitle>
          <DialogDescription>
            Vnesite svoj e-poštni naslov za prijavo na čakalno listo.
            Obvestili vas bomo o morebitnih spremembah.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-pošta</FormLabel>
                  <FormControl>
                    <Input placeholder="janez.novak@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'primary'} type="submit">Prijavi se na čakalno listo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default WaitingListDialog
