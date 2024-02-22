import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'
import type { UserData, UsersLoginRequest } from './types'

export class UsersRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async auth(request: UsersLoginRequest) {
    return this.postRequest<UserData>(`/v2/login?clientId=${request.clientId}`, {
      clientId: 'default',
      login: request.username,
      password: request.password
    })
  }

  public async refreshToken(request: { clientId: string; token: string }) {
    return this.postRequest(`/v2/login?clientId=${request.clientId}`, {
      clientId: 'default',
      refreshToken: request.token
    })
  }
}
