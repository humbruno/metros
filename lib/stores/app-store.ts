import { Destinations } from '@/lib/types'
import { create } from 'zustand'

type State = {
  destinations: Destinations[] | null
}

type Actions = {
  setDestinations: (destinations: Destinations[]) => void
}

type AppStore = State & Actions

export const useAppStore = create<AppStore>()((set) => ({
  //state
  destinations: null,

  //actions
  setDestinations: (destinations) => set({ destinations })
}))
