import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'

export type BalanceStore = {
  balance: number
  type: string
}

export const useBalanceStore = defineStore('balance', () => {
  const clientId = 'default'
  const token = localStorage.getItem('token') as string

  const balance = ref<BalanceStore[]>([])

  async function getBalance() {
    try {
      const res = await api.balance.fetchBalance({ clientId: clientId, token: token })
      balance.value = res.data.map((item) => {
        return {
          balance: item.attributes.available,
          type: item.attributes.currency
        }
      })
    } catch (error) {
      throw new Error(``)
    }
  }

  return { balance, getBalance }
})
