import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'

type GameType = {
  name: string
  image: string
  id: string
}

export const useGamesStore = defineStore('games', () => {
  const clientId = 'default'

  const games = ref<GameType[]>([])

  async function getGames() {
    try {
      const res = await api.games.fetchGames(clientId)
      games.value = res.data.splice(0, 20).map((item) => {
        return {
          image: item.attributes.image,
          name: item.attributes.title,
          id: item.id
        }
      })
    } catch (error) {
      throw new Error(``)
    }
  }

  async function getGameDemo(gameId: string) {
    const res = await api.games.fetchGameDemoUrl({ clientId: clientId, gameId })

    return res.data
  }

  return { games, getGames, getGameDemo }
})
