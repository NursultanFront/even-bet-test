import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'
import type { RefreshTokenResponse, UserDataResponse, UsersLoginRequest } from './types'

export class UsersRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async auth(request: UsersLoginRequest) {
    return this.postRequest<UserDataResponse>(`/v2/login?clientId=${request.clientId}`, {
      clientId: 'default',
      login: request.username,
      password: request.password
    })
  }

  public async refreshToken(request: { clientId: string; token: string }) {
    return this.postRequest<RefreshTokenResponse>(`/auth/token?clientId=${request.clientId}`, {
      clientId: 'default',
      refreshToken: request.token
    })
  }
}
