import { computed, reactive } from 'vue'

interface IErrorsData {
  [field: string]: string
}

export const useFormError = () => {
  const errors = reactive<IErrorsData>({})

  const hasError = (field: string) => typeof errors[field] === 'string'

  const setError = (field: string, text: string) => (errors[field] = text)

  const flushError = (field: string) => delete errors[field]

  const hasErrors = computed(() => Object.keys(errors).length > 0)

  return { errors, hasErrors, hasError, setError, flushError }
}
