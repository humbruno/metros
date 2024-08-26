import { Destinations, Station } from '@/lib/types'
import { create } from 'zustand'

type State = {
  destinations: Destinations[] | null
  stations: Station[] | null
}

type Actions = {
  setDestinations: (destinations: Destinations[]) => void
  setStations: (stations: Station[]) => void
}

type AppStore = State & Actions

export const useAppStore = create<AppStore>()((set) => ({
  //state
  destinations: null,
  stations: null,

  //actions
  setDestinations: (destinations) => set({ destinations }),
  setStations: (stations) => set({ stations })
}))
