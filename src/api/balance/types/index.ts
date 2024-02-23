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

export interface Links {
  self: Self
  first: First
  last: Last
}

export interface Self {
  href: string
}

export interface First {
  href: string
}

export interface Last {
  href: string
}

export interface Meta {
  'total-count': number
  'page-count': number
  'current-page': number
  'per-page': number
}
