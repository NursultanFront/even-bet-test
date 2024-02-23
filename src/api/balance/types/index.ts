import type { Links, Meta } from '@/api/types'

export interface IBalanseResponse {
  data: Balance[]
  links: Links
  meta: Meta
}

export interface Balance {
  id: string
  type: string
  attributes: Attributes
}

export interface Attributes {
  currency: string
  available: number
  'in-play': number
  bonus: number
}
