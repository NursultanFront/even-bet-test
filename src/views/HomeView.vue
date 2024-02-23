<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useBalanceStore } from '@/stores/balance'
import { useGamesStore } from '@/stores/games'
import { useUserStore } from '@/stores/user'
import TheSidebar from '@/components/main/sidebar/TheSidebar.vue'
import PlayCard from '@/components/main/play-card/PlayCard.vue'
import GameModalVue from '@/components/main/game-modal/GameModal.vue'

const balanceStore = useBalanceStore()
const gameStore = useGamesStore()

const isVisible = ref(false)
const gameLink = ref('')

const userStore = useUserStore()
const UPDATE_TIME = 800 * 1000
const BALANCE_UPDATE_TIME = 30 * 1000

let tokenRefreshInterval: ReturnType<typeof setInterval> | null = null
let balanceRefreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  balanceStore.getBalance()
  gameStore.getGames()

  tokenRefreshInterval = setInterval(userStore.refreshToken, UPDATE_TIME)

  balanceRefreshInterval = setInterval(balanceStore.getBalance, BALANCE_UPDATE_TIME)
})

onUnmounted(() => {
  if (tokenRefreshInterval !== null) clearInterval(tokenRefreshInterval)
  if (balanceRefreshInterval !== null) clearInterval(balanceRefreshInterval)
})

const getGame = (id: string) => {
  gameStore
    .getGameDemo(id)
    .then((res) => {
      console.log(res[0].attributes)
      gameLink.value = res[0].attributes['launch-options']['game-url']
    })
    .catch(() => {
      gameLink.value = 'Произошла ошибка'
      throw new Error('Произошла ошибка')
    })

  isVisible.value = true
}

watch(isVisible, () => {
  if (!isVisible.value) {
    gameLink.value = ''
  }
})
</script>

<template>
  <main class="main">
    <TheSidebar :data="balanceStore.balance" />
    <div class="main__list">
      <PlayCard
        v-for="(item, idx) in gameStore.games"
        :data="item"
        :key="idx"
        @on-get-game="getGame"
      />
    </div>
    <GameModalVue v-model="isVisible" :link="gameLink" />
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
