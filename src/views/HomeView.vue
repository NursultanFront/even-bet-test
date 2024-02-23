<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useBalanceStore } from '@/stores/balance'
import { useGamesStore } from '@/stores/games'
import TheSidebar from '@/components/main/sidebar/TheSidebar.vue'
import PlayCard from '@/components/main/play-card/PlayCard.vue'

const balanceStore = useBalanceStore()
const gameStore = useGamesStore()

const BALANCE_UPDATE_TIME = 30 * 1000

let balanceRefreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  balanceStore.getBalance()
  gameStore.getGames()

  balanceRefreshInterval = setInterval(balanceStore.getBalance, BALANCE_UPDATE_TIME)
})

onUnmounted(() => {
  if (balanceRefreshInterval !== null) clearInterval(balanceRefreshInterval)
})
</script>

<template>
  <main class="main">
    <TheSidebar :data="balanceStore.balance" />
    <div class="main__list">
      <PlayCard v-for="(item, idx) in gameStore.games" :data="item" :key="idx" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
