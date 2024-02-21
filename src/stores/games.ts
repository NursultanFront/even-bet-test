import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'

export const useGamesStore = defineStore('games', () => {
  const clientId = 'default'

  async function getGames() {
    try {
      const res = await api.games.fetchGames(clientId)

      return res
    } catch (error) {
      throw new Error(``)
    }
  }

  async function getGameDemo(gameId: string) {
    try {
      const res = await api.games.fetchGameDemoUrl({ clientId: clientId, gameId })

      return res
    } catch (error) {
      throw new Error(``)
    }
  }

  return { getGames, getGameDemo }
})
