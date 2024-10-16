'use server'

import { db } from '@/lib/db'

export const getRandomProject = async () => {
  try {
    // Get all active projects
    const activeProjects = await db.location.findMany({
      where: {
        isActive: true,
      },
      include: {
        realEstates: true,
      },
    })

    // If there are no active projects, return null
    if (activeProjects.length === 0) {
      return null
    }

    // Select a random project from the active ones
    const randomIndex = Math.floor(Math.random() * activeProjects.length)

    const randomProject = activeProjects[randomIndex]

    return randomProject
  } catch (error) {
    console.error('Error fetching random project:', error)
    return null
  }
}
