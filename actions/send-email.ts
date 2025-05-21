'use server'

import { Resend } from 'resend'
import { z } from 'zod'

import { ContactFormEmail } from '@/components/emails/contact-form'
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
      from: 'Gradnje Plus <info@gradnjeplus.com>',
      to: ['info@gradnjeplus.com', 'info@gradnjelenart.com'],
      subject: `Novo kontaktno sporočilo od ${name} ${surname}`,
      react: ContactFormEmail({
        name,
        surname,
        email,
        message,
      }),
    })

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      error: 'Failed to send email',
    }
  }
}
