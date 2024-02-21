import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'

export class GameRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async fetchGames(clientId: string) {
    return this.getRequest(`/v2/casino/games?clientId=${clientId}`)
  }

  public async fetchGameDemoUrl(request: { gameId: string; clientId: string }) {
    return this.postRequest(
      `/v2/casino/games/${request.gameId}/session-demo?clientId=${request.clientId}`,
      {
        clientId: request.clientId,
        gameId: request.gameId
      }
    )
  }
}
