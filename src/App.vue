<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const UPDATE_TIME = 800 * 1000

// setInterval(() => {
//   if (userStore.isAuth) {
//     userStore.refreshToken()
//   }
// }, UPDATE_TIME)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
