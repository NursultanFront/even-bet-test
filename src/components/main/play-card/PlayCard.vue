<script setup lang="ts">
interface IProps {
  data: {
    image: string
    name: string
    id: string
  }
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (event: 'onGetGame', id: string): void
}>()
</script>

<template>
  <div class="play-card" @click="emit('onGetGame', props.data.id)">
    <img class="play-card__image" :src="props.data.image" alt="Картинка игры" />
    <p class="play-card__title">{{ props.data.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.play-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: rgb(70, 70, 70);

  cursor: pointer;

  &__image {
    width: 300px;
    height: 300px;
  }

  &__title {
    color: aliceblue;
  }
}
</style>
