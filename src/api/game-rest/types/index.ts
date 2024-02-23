import type { Links, Meta } from '@/api/types'

export interface GameResponse {
  data: Game[]
  links: Links
  meta: Meta
}

export interface OneGameResponse {
  id: string
  type: string
  attributes: Attributes
}

export interface Game {
  id: string
  type: string
  attributes: Attributes
}

export interface Attributes {
  title: string
  'provider-game-id': string
  provider: string
  categories: string[]
  devices: string[]
  image: string
  table: any
  'limit-id': any
  'is-mini-game': boolean
  'is-new': boolean
  'is-single-currency': boolean
  'is-favorite': boolean
  'has-freespins': boolean
  'has-demo': boolean
  tags: any
  'launch-options': LaunchOptions
  'creation-date': string
  'new-activation-date': any
}

export interface LaunchOptions {
  'game-url': string
  strategy: string
}
