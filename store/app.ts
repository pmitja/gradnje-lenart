import { Location } from '@prisma/client'
import { create } from 'zustand'

type PropertyFilterOptions = {
  floor?: string
  size?: string
  priceRange?: [number, number]
  availability?: string
  isReseted?: boolean
}

interface AppStoreState {
  projectFilters: {
    location?: string
    type?: string
  }
  propertyFilters: PropertyFilterOptions
  currentProjects: Location[]
  updateProjectFilters: (filter: Partial<{ location?: string; type?: string }>) => void
  updatePropertyFilters: (filter: Partial<PropertyFilterOptions>) => void
  updateCurrentProjects: (projects: Location[]) => void
  resetFilters: () => void
}

export const useAppStore = create<AppStoreState>((set) => ({
  projectFilters: {
    location: 'all',
    type: 'all',
  },
  propertyFilters: {
    isReseted: false,
  },
  updateProjectFilters: (filter) => set((state) => ({
    projectFilters: {
      ...state.projectFilters,
      ...filter,
    },
  })),
  updatePropertyFilters: (filter) => set((state) => ({
    propertyFilters: {
      ...state.propertyFilters,
      ...filter,
    },
  })),
  currentProjects: [],
  updateCurrentProjects: (projects) => set({
    currentProjects: projects,
  }),
  resetFilters: () => set({
    projectFilters: {
      location: 'all',
      type: 'all',
    },
    propertyFilters: {
      floor: undefined,
      size: undefined,
      priceRange: undefined,
      availability: undefined,
    },
  }),
}))
