import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_URL}auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'info@gradnjeplus.com',
    to: email,
    subject: 'Verify your email address',
    html: `<p>Click <a href="${confirmationUrl}">here</a> to verify your email address.</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_URL}auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'info@gradnjeplus.com',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetPasswordUrl}">here</a> to reset your password.</p>`,
  })
}
