export interface UserData {
  data: User[]
}

export interface User {
  id: string
  type: string
  attributes: Attributes
}

export interface Attributes {
  token: string
  'token-type': string
  'refresh-token': string
  'life-time': number
  'need-tfa': boolean
}

export type TokenPost = {
  refresh: string
  access: string
}

export type UsersLoginRequest = {
  username: string
  password: string

  clientId: string
}
