export type TokenPost = {
  refresh: string
  access: string
}

export type User = {
  email: string
  first_name: string
  last_name: string
  patronymic: string
  position: any | null
  department: string | null
}

export type UsersLoginRequest = {
  username: string
  password: string

  clientId: string
}
