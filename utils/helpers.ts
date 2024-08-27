import { useAppStore } from '@/lib/stores/app-store'

export function getDestinationLabel(destinationId: string) {
  const destinations = useAppStore.getState().destinations

  if (!destinations) return ''

  const label = destinations.find(
    (v) => v.id_destino === destinationId
  )?.nome_destino
  return label
}

export function getStationLabel(stationId: string) {
  const stations = useAppStore.getState().stations

  if (!stations) return ''

  const label = stations.find((v) => v.stop_id === stationId)?.stop_name
  return label
}

export function formatArrivalTime(secondsStr: string): string {
  const seconds = Number.parseInt(secondsStr)

  // Calculate the minutes and seconds
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // Pad the minutes and seconds with leading zeros if necessary
  const minutesString = minutes.toString().padStart(2, '0')
  const secondsString = remainingSeconds.toString().padStart(2, '0')

  // Return the formatted time string
  return `${minutesString}:${secondsString}`
}
