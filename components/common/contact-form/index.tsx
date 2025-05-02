'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const [ name, setName ] = useState('')

  const [ email, setEmail ] = useState('')

  const [ phone, setPhone ] = useState('')

  const [ message, setMessage ] = useState('')

  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const [ submitted, setSubmitted ] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would send the form data to your backend
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-green-700">Sporočilo poslano!</h3>
        <p className="text-green-600">
          Hvala za vaše sporočilo. Odgovorili vam bomo v najkrajšem možnem času.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Ime in priimek</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message">Sporočilo</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-300 text-white hover:bg-primary-400"
      >
        {isSubmitting ? 'Pošiljanje...' : 'Pošlji sporočilo'}
      </Button>
    </form>
  )
}
