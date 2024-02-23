import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'
import type { IBalanseResponse } from './types'

export class BalanceRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async fetchBalance(request: { clientId: string; token: string }) {
    return this.getRequest<IBalanseResponse>(
      `/v2/users/me/balance?clientId=${request.clientId}&auth=${request.token}`
    )
  }
}
