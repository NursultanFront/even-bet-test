<template>
  <div class="input-box">
    <label v-if="shouldShowLabel" :id="props.id" class="label">{{ props.label }}</label>
    <div
      class="input-wrapper"
      :class="{
        'input-wrapper_disabled': disabled,
        [`input-wrapper_${variant}`]: variant,
        'input-wrapper_success': isInputValidated,
        'input-wrapper_error': hasError
      }"
    >
      <slot name="left-icon" />
      <input
        :id="props.id"
        :value="input"
        :name="name"
        :type="calculatedInputType"
        class="input"
        :placeholder="placeholder"
        :disabled="disabled"
        :minlength="minLength"
        :maxlength="maxLength"
        @change="onChange"
        @input="onInput"
        @focusin="(e) => emit('focusin', e)"
        @focusout="(e) => emit('focusout', e)"
        @blur="(e) => emit('blur', e)"
      />
      <TheLoader v-if="props.isLoading" class="input__right-icon" />
      <slot v-else-if="!rightIconDisabled" name="right-icon">
        <SuccessIcon v-if="isInputValidated" class="input__right-icon input__right-icon_success" />
        <template v-else-if="isTogglePasswordIconVisible">
          <HidePasswordIcon
            v-if="isPasswordVisible"
            class="input__right-icon input__right-icon_clear"
            @click="onTogglePasswordVisibility"
          />
          <ShowPasswordIcon
            v-else
            class="input__right-icon input__right-icon_clear"
            @click="onTogglePasswordVisibility"
          />
        </template>
        <RemoveIcon
          v-else-if="isCleanIconVisible"
          width="24"
          height="24"
          class="input__right-icon input__right-icon_clear"
          @click="onClear"
        />
      </slot>
    </div>
    <slot name="tip">
      <div
        v-if="isTipTextVisible"
        class="input-box__tip text-3"
        :class="{
          [`input-box__tip_${variant}`]: variant,
          'input-box__tip_error': hasError
        }"
      >
        {{ tipTextForInput }}
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Mask } from 'maska'
import TheLoader from '../loader/TheLoader.vue'
import SuccessIcon from '@/components/icons/SuccessIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import ShowPasswordIcon from '@/components/icons/ShowPasswordIcon.vue'
import HidePasswordIcon from '@/components/icons/HidePasswordIcon.vue'

type InputVariant = 'default' | 'warning'
type InputType = 'text' | 'password' | 'email' | 'tel'

export interface IProps {
  id?: string
  name?: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  // TODO: deprecated
  variant?: InputVariant
  minLength?: number
  maxLength?: number
  rightIconDisabled?: boolean
  tipText?: string
  errorText?: string
  isLoading?: boolean
  type?: InputType
  isValidated?: boolean
  mask?: string
  label?: string
  modelModifiers?: {
    lazy?: boolean
  }
}

export interface IChangedEvent {
  masked: string
  unmasked: string
  completed: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  disabled: false,
  variant: 'default',
  modelValue: '',
  modelModifiers: () => ({
    lazy: false
  })
})
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'focusin', value: Event): void
  (event: 'focusout', value: Event): void
  (event: 'onChange', value: IChangedEvent): void
  (event: 'blur', value: Event): void
}>()

const isPasswordVisible = ref(false)
const maskInstance = ref<Mask>(
  new Mask({
    mask: props.mask
  })
)

const input = computed<string>({
  get() {
    return maskInstance.value.masked(props.modelValue ?? '')
  },
  set(value: string) {
    emit('update:modelValue', maskInstance.value.unmasked(value))
  }
})

const isInputValidated = computed(() => input.value.length > 0 && props.isValidated)

const isCleanIconVisible = computed(() => input.value.length > 0)
const isTogglePasswordIconVisible = computed(
  () => props.type === 'password' && input.value.length > 0
)
const calculatedInputType = computed(() =>
  props.type === 'password' && isPasswordVisible.value ? 'text' : props.type
)
const hasError = computed(() => props.errorText && props.errorText.length > 0)
const isTipTextVisible = computed(() => {
  const hasTip = props.tipText && props.tipText.length > 0

  return hasError.value || hasTip
})
const tipTextForInput = computed(() => (hasError.value ? props.errorText : props.tipText ?? null))
const shouldShowLabel = computed(() => props.label && props.label.length > 0)

const onClear = () => (input.value = '')
const onTogglePasswordVisibility = () => (isPasswordVisible.value = !isPasswordVisible.value)

const handleChangeEvent = (event: Event) => {
  const element = event.target as HTMLInputElement
  const value = element.value

  input.value = value
}

const onInput = (event: Event) => !props.modelModifiers.lazy && handleChangeEvent(event)
const onChange = (event: Event) => props.modelModifiers.lazy && handleChangeEvent(event)
</script>
<style lang="scss">
.input-box {
  &__tip {
    margin-top: px-to-rem(8px);
    color: #000000;

    &_error {
      color: #ff3c00;
    }

    &_warning {
      color: var(--vkd-orange-main);
      color: #bd9030;
    }
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  color: #000000;
  padding: 7px 32px 7px 16px;
  font-size: 18px;
  font-weight: 500;
  position: relative;

  border: 1px solid #aaaaaa;

  &:focus-within {
    border-color: #777575;
  }

  &_error {
    border-color: #ff3c00;
  }

  &_warning {
    border-color: #bd9030;
  }

  &_success {
    border-color: #42ff29;
  }

  &_disabled {
    background-color: #777575;
    border: 1px solid #706b6b;

    .input {
      background-color: transparent;
      color: #aaaaaa;
    }
  }
}

.input {
  border: 0;
  outline: none;
  width: 100%;

  color: #000000;
  font-size: 18px;
  font-weight: 500;
  text-align: inherit;

  &::placeholder {
    color: #5a5a5a;
  }

  &__right-icon {
    position: absolute;
    right: 8px;
    width: 24px;

    &_clear {
      color: #5a5a5a;
    }

    &_success {
      color: #42ff29;
    }
  }
}

.label {
  display: block;
  color: #000000;
  margin-bottom: 8px;
  font-size: 14px;
}
</style>
