import { create } from 'zustand'

interface AppState {
  isMenuOpen: boolean
  currentSection: string
  isLoading: boolean
  setMenuOpen: (open: boolean) => void
  setCurrentSection: (section: string) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  currentSection: 'hero',
  isLoading: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
