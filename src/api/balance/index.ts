import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'

export class BalanceRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async fetchBalance(request: { clientId: string; token: string }) {
    return this.getRequest(`/users/me/balance?clientId=${request.clientId}&auth=${request.token}`)
  }
}
