import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'

export const useUserStore = defineStore('user', () => {
  const clientId = 'default'
  const token = localStorage.getItem('token')
  async function login(login: string, password: string) {
    try {
      const res = await api.users.auth({ clientId: clientId, username: login, password })

      return res
    } catch (error) {
      throw new Error(``)
    }
  }

  async function refreshToken() {
    if (!token) return

    try {
      const res = await api.users.refreshToken({ clientId: clientId, token: token })
      return res
    } catch (error) {
      throw new Error(``)
    }
  }

  return { login, refreshToken }
})
