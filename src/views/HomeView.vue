<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBalanceStore } from '@/stores/balance'
import { useGamesStore } from '@/stores/games'
import TheSidebar from '@/components/main/sidebar/TheSidebar.vue'
import PlayCard from '@/components/main/play-card/PlayCard.vue'
import GameModalVue from '@/components/main/game-modal/GameModal.vue'

const balanceStore = useBalanceStore()
const gameStore = useGamesStore()

const isVisible = ref(false)
const gameLink = ref('')

onMounted(() => {
  balanceStore.getBalance()
  gameStore.getGames()
})

const getGame = (id: string) => {
  gameStore
    .getGameDemo(id)
    .then((res) => {
      console.log(res[0].attributes)
      gameLink.value = res[0].attributes['launch-options']['game-url']
    })
    .catch(() => {
      throw new Error('Произошла ошибка')
    })

  isVisible.value = true
}
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
