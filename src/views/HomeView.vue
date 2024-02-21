<script setup lang="ts">
import { ref } from 'vue'
import TheInput from '@/components/ui/input/TheInput.vue'
import TheButton from '@/components/ui/button/TheButton.vue'
const login = ref('')
const password = ref('')
</script>

<template>
  <main>
    <form>
      <TheInput v-model="login" placeholder="Логин" />
      <TheInput v-model="password" placeholder="Пароль" />
      <TheButton>Войти</TheButton>
    </form>
  </main>
</template>
