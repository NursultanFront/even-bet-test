import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import type { UserDataResponse } from '@/api/users-rest/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataResponse | null>(null)

  const isAuth = computed(() => !!user.value)

  const clientId = 'default'

  async function login(login: string, password: string) {
    const res = await api.users.auth({ clientId: clientId, username: login, password })
    user.value = res
    localStorage.setItem('refresh-token', user.value.data[0].attributes['refresh-token'])
    localStorage.setItem('token', user.value.data[0].attributes.token)
  }

  async function refreshToken() {
    const token = localStorage.getItem('refresh-token') as string
    console.log(token)
    try {
      const res = await api.users.refreshToken({ clientId: clientId, token: token })
      localStorage.setItem('refresh-token', res['refresh-token'])
      localStorage.setItem('token', res.token)
    } catch (error) {
      throw new Error(``)
    }
  }

  return { user, isAuth, login, refreshToken }
})
