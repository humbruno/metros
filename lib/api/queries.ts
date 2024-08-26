import { useQuery } from '@tanstack/react-query'
import { getLineWaitingTimes } from './endpoints'

const SECOND = 1000

export function useLineWaitingTimes(line: string) {
  return useQuery({
    queryKey: ['waitingTimes', line],
    queryFn: async () => await getLineWaitingTimes(line),
    refetchInterval: SECOND * 10
  })
}
