import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'

export const useBalanceStore = defineStore('balance', () => {
  const clientId = 'default'
  const token = localStorage.getItem('token')

  async function getBalance() {
    if (!token) return
    try {
      const res = await api.balance.fetchBalance({ clientId: clientId, token: token })

      return res
    } catch (error) {
      throw new Error(``)
    }
  }

  return { getBalance }
})
