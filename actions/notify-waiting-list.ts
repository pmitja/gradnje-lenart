'use server'

import { Resend } from 'resend'

import { PropertyNotificationEmail } from '@/components/emails/property-notification'
import { db } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export async function notifyWaitingList(realEstateId: string, realEstateName: string, slug: string) {
  try {
    // Fetch waiting list entries for the given realEstateId
    const waitingListEntries = await db.waitingListEntry.findMany({
      where: {
        realEstateId,
      },
    })

    if (waitingListEntries.length === 0) {
      return {
        success: true,
        message: 'No entries in the waiting list',
      }
    }

    const propertyUrl = `https://www.gradnjeplus.com/${slug}`

    // Prepare email data for each entry
    const emailData = waitingListEntries.map((entry) => ({
      from: 'Gradnje Plus <info@gradnjeplus.com>',
      to: [ entry.email ],
      subject: 'Nepremičnina je na voljo – Ne zamudite priložnosti!',
      react: PropertyNotificationEmail({
        realEstateName,
        propertyUrl,
        recipientEmail: entry.email,
      }),
    }))

    // Send batch emails
    await resend.batch.send(emailData)

    return {
      success: true,
      message: 'Notifications sent successfully',
    }
  } catch (error) {
    console.error('Error sending notifications:', error)
    return {
      success: false,
      error: 'Failed to send notifications',
    }
  }
}
