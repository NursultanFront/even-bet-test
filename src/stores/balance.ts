import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { useUserStore } from '@/stores/user'

export type BalanceStore = {
  balance: number
  type: string
}

export const useBalanceStore = defineStore('balance', () => {
  const clientId = 'default'

  const balance = ref<BalanceStore[]>([])

  async function getBalance() {
    const token = localStorage.getItem('token') as string
    try {
      const res = await api.balance.fetchBalance({ clientId: clientId, token: token })
      balance.value = res.data.map((item) => {
        return {
          balance: item.attributes.available,
          type: item.attributes.currency
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { balance, getBalance }
})
