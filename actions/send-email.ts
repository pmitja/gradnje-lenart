'use server'

import { Resend } from 'resend'
import { z } from 'zod'

import { contactFormSchema } from '@/schemas'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: z.infer<typeof contactFormSchema>) {
  const result = contactFormSchema.safeParse(formData)

  if (!result.success) {
    return {
      error: 'Invalid form data',
    }
  }

  const { name, surname, email, message } = result.data

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: '200codestatus@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name} ${surname}
        Email: ${email}
        Message: ${message}
      `,
    })

    return {
      success: true, data,
    }
  } catch (error) {
    return {
      error: 'Failed to send email',
    }
  }
}
