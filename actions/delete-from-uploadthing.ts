'use server'

import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export const deleteUTFiles = async (key: string[]) => {
  try {
    await utapi.deleteFiles(key)
    return {
      success: 'Slika je odstranjena',
    }
  } catch (error) {
    console.error('UTAPI: Error deleting files', error)
    return {
      error: 'Nekaj je šlo narobe, poizkusi ponovno!',
    }
  }
}
