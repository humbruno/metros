import { tokenSchema } from '@/utils/schemas'
import { z } from 'zod'

export type TokenResponse = z.infer<typeof tokenSchema>

export type ApiResponse<T> = { resposta: T; codigo: string }

export type WaitingTime = {
  stop_id: string
  cais: string
  hora: string
  comboio: string
  tempoChegada1: string
  comboio2: string
  tempoChegada2: string
  comboio3: string
  tempoChegada3: string
  destino: string
  sairServico: string
  UT: string
}

export type LineWaitingTime = Omit<WaitingTime, 'UC'>

export type Destinations = {
  id_destino: string
  nome_destino: string
}

export type Station = {
  stop_id: string
  stop_name: string
  stop_lat: string
  stop_lon: string
  stop_url: string
  linha: string
  zone_id: string
}

export type AllLinesStatuses = {
  amarela: string
  azul: string
  verde: string
  vermelha: string
  tipo_msg_am: string
  tipo_msg_az: string
  tipo_msg_vd: string
  tipo_msg_vm: string
}
