'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { reserveRealEstate } from '@/actions/reserve-real-estate'
import { Button } from '@/components/ui/button'
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(9, 'Phone number must be at least 9 characters'),
})

interface ReservationDialogProps {
  realEstateId: string
  children: React.ReactNode
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ realEstateId, children }) => {
  const router = useRouter()

  const [ isOpen, setIsOpen ] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await reserveRealEstate({
      ...values,
      realEstateId,
    })

    if (result.success) {
      setIsOpen(false)
      toast.success('Rezervacija uspešna!', {
        description: 'Kontaktirali vas bomo za potrditev.',
      })
      router.refresh()
    } else {
      toast.error('Napaka pri rezervaciji!', {
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
          <DialogTitle>Rezervacija nepremičnine</DialogTitle>
          <DialogDescription>
            Izpolnite obrazec za rezervacijo nepremičnine. Kontaktirali vas bomo za potrditev.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Polno ime</FormLabel>
                  <FormControl>
                    <Input placeholder="Janez Novak" {...field} />
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
                  <FormLabel>E-pošta</FormLabel>
                  <FormControl>
                    <Input placeholder="janez.novak@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonska številka</FormLabel>
                  <FormControl>
                    <Input placeholder="041 123 456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'primary'} type="submit">Pošlji rezervacijo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationDialog
