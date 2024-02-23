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
