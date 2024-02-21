import axios from 'axios'

import { UsersRest } from './users-rest'
import { BalanceRest } from './balance'
import { GameRest } from './game-rest'

class Api {
  public constructor() {
    this.endpoint = Api.createEndpoint()
    this.balance = new BalanceRest(this.endpoint)
    this.users = new UsersRest(this.endpoint)
    this.games = new GameRest(this.endpoint)
  }

  private static createEndpoint() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public readonly users
  public readonly balance
  public readonly games

  private readonly endpoint
}

export const api = new Api()
