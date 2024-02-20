import axios from 'axios'

import { UsersRest } from './users-rest'

class Api {
  public constructor() {
    this.endpoint = Api.createEndpoint()

    this.users = new UsersRest(this.endpoint)
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

  private readonly endpoint
}

export const api = new Api()
