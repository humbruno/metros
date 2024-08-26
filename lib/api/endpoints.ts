import type {
  AllLinesStatuses,
  ApiResponse,
  Destinations,
  LineWaitingTime,
  Station,
  WaitingTime
} from '@/lib/types'
import axios from 'axios'

export function getAllStationsWaitingTimes() {
  return axios.get<ApiResponse<WaitingTime[]>>('/tempoEspera/Estacao/todos')
}

export function getStationStatus(station: string) {
  return axios.get<ApiResponse<Station[]>>(`/infoEstacao/${station}`)
}

export function getAllStationsStatuses() {
  return axios.get<ApiResponse<Station[]>>('/infoEstacao/todos')
}

export function getAllLinesStatuses() {
  return axios.get<ApiResponse<AllLinesStatuses>>('/estadoLinha/todos')
}

export function getLineWaitingTimes(line: string) {
  return axios.get<ApiResponse<LineWaitingTime[]>>(`/tempoEspera/Linha/${line}`)
}

export function getStationWaitingTimes(station: string) {
  return axios.get<ApiResponse<WaitingTime[]>>(
    `/tempoEspera/Estacao/${station}`
  )
}

export function getAllDestinations() {
  return axios.get<ApiResponse<Destinations[]>>('/infoDestinos/todos')
}
