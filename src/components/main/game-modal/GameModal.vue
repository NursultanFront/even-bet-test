<template>
  <TheModal v-model="isVisible" id="game">
    <div>{{ props.link }}</div>
  </TheModal>
</template>

<script setup lang="ts">
import TheModal from '@/components/ui/modal/TheModal.vue'

const props = defineProps<{ link: string }>()

const isVisible = defineModel({
  required: true,
  default: false
})
</script>

<style scoped></style>
