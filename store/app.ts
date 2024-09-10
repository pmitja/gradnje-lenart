import { Location } from '@prisma/client'
import { create } from 'zustand'

type ProjectFilterOptions = {
  location?: string
  type?: string
}

interface AppStoreState {
  projectFilters: ProjectFilterOptions
  currentProjects: Location[]
  updateProjectFilters: (filter: Partial<ProjectFilterOptions>) => void
  updateCurrentProjects: (projects: Location[]) => void
  resetFilters: () => void
}

export const useAppStore = create<AppStoreState>((set) => ({
  projectFilters: {
    location: 'all',
    type: 'all',
  },
  updateProjectFilters: (filter) => set({
    projectFilters: {
      ...filter,
    },
  }),
  currentProjects: [],
  updateCurrentProjects: (projects) => set({
    currentProjects: projects,
  }),
  resetFilters: () => set({
    projectFilters: {
      location: 'all', type: 'all',
    },
  }),
}))
