"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
    return { success: 'Slika je odstranjena' };
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
    return { error: 'Nekaj je šlo narobe, poizkusi ponovno!' };
  }
};
