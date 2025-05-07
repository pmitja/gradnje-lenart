import { create } from 'zustand'

interface PropertyFilters {
  floor?: string
  size?: string
  priceRange?: [number, number]
  availability?: string
  isReseted?: boolean
}

interface ProjectFilters {
  location?: string
  type?: string
}

interface AppState {
  propertyFilters: PropertyFilters
  projectFilters: ProjectFilters
  isFilterLoading: boolean
  // eslint-disable-next-line no-unused-vars
  updatePropertyFilters: (_filters: PropertyFilters) => void
  // eslint-disable-next-line no-unused-vars
  updateProjectFilters: (_filters: ProjectFilters) => void
  // eslint-disable-next-line no-unused-vars
  setFilterLoading: (loading: boolean) => void
  resetFilters: () => void
}

export const useAppStore = create<AppState>((set) => ({
  propertyFilters: {
    priceRange: [ 0, 500000 ],
    isReseted: false,
  },
  projectFilters: {
    location: 'all',
    type: 'all',
  },
  isFilterLoading: false,
  updatePropertyFilters: (_filters) => set((state) => ({
    propertyFilters: {
      ...state.propertyFilters,
      ..._filters,
    },
    isFilterLoading: true,
  })),
  updateProjectFilters: (_filters) => set((state) => ({
    projectFilters: {
      ...state.projectFilters,
      ..._filters,
    },
  })),
  setFilterLoading: (loading) => set({
    isFilterLoading: loading,
  }),
  resetFilters: () => set({
    propertyFilters: {
      priceRange: [ 0, 500000 ],
      isReseted: true,
    },
    projectFilters: {
      location: 'all',
      type: 'all',
    },
    isFilterLoading: true,
  }),
}))
