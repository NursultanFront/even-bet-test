<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
setInterval(() => {
  if (userStore.isAuth) {
    userStore.refreshToken()
  }
}, 800 * 1000)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
