<template>
  <main class="main">
    <TheSidebar :data="balanceStore.balance" />
    <div></div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBalanceStore } from '@/stores/balance'

import TheSidebar from '@/components/main/sidebar/TheSidebar.vue'

const balanceStore = useBalanceStore()
onMounted(() => {
  balanceStore.getBalance()
})
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}
</style>
