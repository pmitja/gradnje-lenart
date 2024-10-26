'use server'

import { Resend } from 'resend'

import { db } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function notifyWaitingList(realEstateId: string, realEstateName: string) {
  try {
    // Fetch waiting list entries for the given realEstateId
    const waitingListEntries = await db.waitingListEntry.findMany({
      where: {
        realEstateId,
      },
    })

    if (waitingListEntries.length === 0) {
      return {
        success: true, message: 'No entries in the waiting list',
      }
    }

    // Prepare email data for each entry
    const emailData = waitingListEntries.map((entry) => ({
      from: 'Gradnje Plus <onboarding@resend.dev>',
      to: [ entry.email ],
      subject: 'Nepremičnina je na voljo',
      html: `<p>Spoštovani,</p>
             <p>Obveščamo vas, da je nepremičnina ${realEstateName}, za katero ste izrazili zanimanje, zdaj na voljo.</p>
             <p>Za več informacij nas prosim kontaktirajte.</p>
             <p>Lep pozdrav,<br>Vaša ekipa</p>`,
    }))

    // Send batch emails
    await resend.batch.send(emailData)

    return {
      success: true, message: 'Notifications sent successfully',
    }
  } catch (error) {
    console.error('Error sending notifications:', error)
    return {
      success: false, error: 'Failed to send notifications',
    }
  }
}
