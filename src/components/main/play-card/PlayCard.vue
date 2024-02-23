<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useGamesStore } from '@/stores/games'
import TheButton from '@/components/ui/button/TheButton.vue'
import GameModal from '@/components/main/game-modal/GameModal.vue'

interface IProps {
  data: {
    image: string
    name: string
    id: string
  }
}

const props = defineProps<IProps>()
const gameStore = useGamesStore()
const gameLink = ref('')
const isVisible = ref(false)

function openGame() {
  gameStore
    .getGameDemo(props.data.id)
    .then((res) => {
      const url = res[0].attributes['launch-options']['game-url']
      gameLink.value = url
      window.open(url, '_blank')
    })
    .catch((error) => {
      gameLink.value = 'Ошибка получения ссылки на игру'
      isVisible.value = true
      console.error('Ошибка получения ссылки на игру:', error)
    })
}

watch(isVisible, () => {
  if (!isVisible.value) {
    gameLink.value = ''
  }
})
</script>

<template>
  <div class="play-card">
    <img class="play-card__image" :src="props.data.image" alt="Картинка игры" />
    <div class="play-card__content">
      <p class="play-card__title">{{ props.data.name }}</p>
      <TheButton @click="openGame">Play Demo</TheButton>
    </div>
  </div>
  <GameModal v-model="isVisible" :link="gameLink" />
</template>

<style scoped lang="scss">
.play-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: rgb(70, 70, 70);
  width: 300px;
  cursor: pointer;

  &__image {
    height: 300px;
  }

  &__title {
    color: aliceblue;
  }

  &__content {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
