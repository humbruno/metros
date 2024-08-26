import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

const mmkvInstance = new MMKV()

const storage: StateStorage = {
  getItem: (key: string) => mmkvInstance.getString(key) || null,
  setItem: (key: string, value: string) => mmkvInstance.set(key, value),
  removeItem: (key: string) => mmkvInstance.delete(key)
}

type State = {
  favouriteStations: string[] | null
}

type Actions = {
  setFavouriteStations: (favouriteStations: string[] | null) => void
  clearStore: () => void
}

type UserStore = State & Actions

const initialState: State = {
  favouriteStations: null
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      //state
      ...initialState,

      //actions
      setFavouriteStations: (favouriteStations) => set({ favouriteStations }),
      clearStore: () => set(initialState)
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => storage)
    }
  )
)
