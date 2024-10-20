'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export async function reactivateProject(slug: string) {
  try {
    // Update the location to set isActive to true
    await db.location.update({
      where: {
        slug,
      },
      data: {
        isActive: true,
      },
    })

    // Revalidate the path to ensure the UI updates
    revalidatePath('/nadzorna-plosca/aktualni-projekt/[slug]')
    revalidatePath('/nadzorna-plosca')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error reactivating project:', error)
    return {
      success: false,
      error: 'Pri ponovni aktivaciji projekta je prišlo do napake.',
    }
  }
}
