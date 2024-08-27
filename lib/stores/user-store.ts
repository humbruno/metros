import { FavouritedStation } from '@/lib/types'
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
  favouriteStations: FavouritedStation[] | null
}

type Actions = {
  toggleFavouriteStation: (station: FavouritedStation) => void
  addFavouriteStation: (station: FavouritedStation) => void
  removeFavouriteStation: (favouriteStation: FavouritedStation) => void
  clearStore: () => void
}

type UserStore = State & Actions

const initialState: State = {
  favouriteStations: null
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      //state
      ...initialState,

      //actions
      toggleFavouriteStation: (station) => {
        const currentFavourites = get().favouriteStations
        const isAlreadyFavourited = !!currentFavourites?.find(
          (v) => v.stop_id === station.stop_id && v.destino === station.destino
        )

        if (isAlreadyFavourited) {
          get().removeFavouriteStation(station)
        } else {
          get().addFavouriteStation(station)
        }
      },
      addFavouriteStation: (station) =>
        set((state) => ({
          favouriteStations: [...(state.favouriteStations || []), station]
        })),
      removeFavouriteStation: (favouriteStation) =>
        set((state) => ({
          favouriteStations: state.favouriteStations?.filter(
            (item) =>
              item.stop_id !== favouriteStation.stop_id &&
              item.destino !== favouriteStation.destino
          )
        })),
      clearStore: () => set(initialState)
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => storage)
    }
  )
)
