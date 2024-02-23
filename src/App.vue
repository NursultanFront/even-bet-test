<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted, onUnmounted, watch } from 'vue'

const userStore = useUserStore()
const UPDATE_TIME = 800 * 1000

let tokenRefreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {})

watch(
  () => userStore.isAuth,
  () => {
    if (userStore.isAuth) {
      tokenRefreshInterval = setInterval(userStore.refreshToken, UPDATE_TIME)
    }
  }
)

onUnmounted(() => {
  if (tokenRefreshInterval !== null) clearInterval(tokenRefreshInterval)
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
