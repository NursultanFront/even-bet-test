import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'
import type { TokenPost, User, UsersLoginRequest } from './types'

export class UsersRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async auth(request: UsersLoginRequest) {
    return this.postRequest(`/v2/login`, {
      clientId: 'default',
      login: request.username,
      password: request.password
    })
  }
}
