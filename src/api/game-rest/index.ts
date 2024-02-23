import { BasicRest } from '../basic-rest'

import type { AxiosInstance } from 'axios'
import { type OneGameResponse, type GameResponse } from './types'

export class GameRest extends BasicRest {
  public constructor(endpoint: AxiosInstance) {
    super(endpoint)
  }

  public async fetchGames(clientId: string) {
    return this.getRequest<GameResponse>(`/v2/casino/games?clientId=${clientId}`)
  }

  public async fetchGameDemoUrl(request: { gameId: string; clientId: string }) {
    return this.postRequest<{ data: OneGameResponse[] }>(
      `/v2/casino/games/${request.gameId}/session-demo?clientId=${request.clientId}`,
      {
        clientId: request.clientId,
        gameId: request.gameId
      }
    )
  }
}
