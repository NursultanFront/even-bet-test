import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import type { UserData } from '@/api/users-rest/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserData | null>(null)

  const isAuth = computed(() => !!user.value)

  const clientId = 'default'
  const token = localStorage.getItem('refresh-token') as string

  async function login(login: string, password: string) {
    const res = await api.users.auth({ clientId: clientId, username: login, password })
    user.value = res
    localStorage.setItem('refresh-token', user.value.data[0].attributes['refresh-token'])
    localStorage.setItem('token', user.value.data[0].attributes.token)
  }

  async function refreshToken() {
    try {
      const res = await api.users.refreshToken({ clientId: clientId, token: token })
      // localStorage.setItem('refresh-token', user.value.data[0].attributes['refresh-token'])
      // localStorage.setItem('token', user.value.data[0].attributes.token)
    } catch (error) {
      throw new Error(``)
    }
  }

  return { user, isAuth, login, refreshToken }
})
