<script setup lang="ts">
import type { BalanceStore } from '@/stores/balance'

interface IProps {
  data: BalanceStore[]
}

const props = defineProps<IProps>()
</script>

<template>
  <aside class="aside">
    <div v-for="(item, idx) in props.data" :key="idx" class="aside__item">
      <span class="aside__currency">Currency - {{ item.type }}</span>
      <span class="aside__balance">Balance - {{ item.balance }}</span>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 20px;
  height: 100%;
  background-color: rgb(70, 70, 70);

  &__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: aliceblue;
  }
}
</style>
