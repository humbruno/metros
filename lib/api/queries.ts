import {
  getLineWaitingTimes,
  getStationWaitingTimes
} from '@/lib/api/endpoints'
import { useUserStore } from '@/lib/stores/user-store'
import { ResolvedLineWaitingTime } from '@/lib/types'
import { getDestinationLabel, getStationLabel } from '@/utils/helpers'
import { useQuery } from '@tanstack/react-query'

const SECOND = 1000

export function useLineWaitingTimes(line: string) {
  return useQuery({
    queryKey: ['waitingTimes', line],
    queryFn: async () => {
      const data = await getLineWaitingTimes(line)
      const favouriteStations = useUserStore.getState().favouriteStations
      return data.data.resposta.map((v) => ({
        ...v,
        stationLabel: getStationLabel(v.stop_id),
        destinationLabel: getDestinationLabel(v.destino),
        isFavourite: !!favouriteStations?.find(
          (item) => item.stop_id === v.stop_id && item.destino === v.destino
        )
      })) as ResolvedLineWaitingTime[]
    },
    refetchInterval: SECOND * 10
  })
}

export function useStationWaitingTimes(station: string) {
  return useQuery({
    queryKey: ['waitingTimes', station],
    queryFn: async () => {
      const data = await getStationWaitingTimes(station)
      const favouriteStations = useUserStore.getState().favouriteStations
      return data.data.resposta.map((v) => ({
        ...v,
        stationLabel: getStationLabel(v.stop_id),
        destinationLabel: getDestinationLabel(v.destino),
        isFavourite: !!favouriteStations?.find(
          (item) => item.stop_id === v.stop_id && item.destino === v.destino
        )
      })) as ResolvedLineWaitingTime[]
    },
    refetchInterval: SECOND * 10
  })
}
