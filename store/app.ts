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
  isFilterLoading: boolean
  updateProjectFilters: (_filter: Partial<{ location?: string; type?: string }>) => void
  updatePropertyFilters: (_filter: Partial<PropertyFilterOptions>) => void
  updateCurrentProjects: (_projects: Location[]) => void
  setFilterLoading: (_isLoading: boolean) => void
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
  isFilterLoading: false,
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
    isFilterLoading: true,
  })),
  currentProjects: [],
  updateCurrentProjects: (projects) => set({
    currentProjects: projects,
  }),
  setFilterLoading: (isLoading) => set({
    isFilterLoading: isLoading,
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
    isFilterLoading: true,
  }),
}))
