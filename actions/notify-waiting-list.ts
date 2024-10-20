'use server'

import { Resend } from 'resend'

import { getWaitingListEmails } from './get-waiting-list-emails'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function notifyWaitingList(realEstateId: string, realEstateName: string) {
  try {
    const waitingListEmails = await getWaitingListEmails(realEstateId)

    if (waitingListEmails.length === 0) {
      return {
        success: true, message: 'No emails in waiting list',
      }
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: waitingListEmails,
      subject: 'Nepremičnina je na voljo',
      html: `
        <p>Spoštovani,</p>
        <p>Obveščamo vas, da je nepremičnina ${realEstateName} zdaj na voljo.</p>
        <p>Če ste še vedno zainteresirani, vas prosimo, da nas kontaktirate čim prej.</p>
        <p>Lep pozdrav,<br>Vaša ekipa za nepremičnine</p>
      `,
    })

    return {
      success: true, message: 'Emails sent successfully',
    }
  } catch (error) {
    console.error('Error notifying waiting list:', error)
    return {
      success: false, message: 'Failed to send emails',
    }
  }
}
