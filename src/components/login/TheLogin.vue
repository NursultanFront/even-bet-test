<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useFormError } from '@/composable/useFormError'
import TheInput from '@/components/ui/input/TheInput.vue'
import TheButton from '@/components/ui/button/TheButton.vue'
import { useRouter } from 'vue-router'

enum FormField {
  Login = 'login',
  Password = 'password'
}

const login = ref('richard')
const password = ref('poker')

const store = useUserStore()

const router = useRouter()

const { errors, setError, hasError, flushError } = useFormError()

const isValidLogin = computed(() => login.value.length > 0 && !hasError(FormField.Login))

const isValidPassword = computed(() => password.value.length > 0 && !hasError(FormField.Password))

const canSubmit = computed(() => isValidLogin.value && isValidPassword.value)

const onFinishLogin = () => {
  store
    .login(login.value, password.value)
    .then(() => router.push('/'))
    .catch((error) => {
      setError(FormField.Password, 'Неверный адрес электронной почты или пароль')
    })
}

watch(
  () => login,
  () => {
    flushError(FormField.Login)
  }
)

watch(password, () => flushError(FormField.Password))
</script>

<template>
  <main>
    <form @submit.prevent="onFinishLogin">
      <TheInput
        v-model="login"
        placeholder="Логин"
        :error-text="errors[FormField.Login]"
        :is-validated="isValidLogin"
      />
      <TheInput
        v-model="password"
        placeholder="Пароль"
        :is-validated="isValidPassword"
        :error-text="errors[FormField.Password]"
      />
      <TheButton type="submit" :disabled="!canSubmit">Войти</TheButton>
    </form>
  </main>
</template>
