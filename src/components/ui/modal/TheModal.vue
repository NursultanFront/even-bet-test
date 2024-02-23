<template>
  <Teleport to="body">
    <dialog
      :id="modalId"
      ref="modalElementRef"
      class="modal"
      @keydown.esc="onCloseViaEsc"
      @click="close"
    >
      <div v-if="isVisible" class="modal-layout">
        <div class="modal-content">
          <slot :close="close" />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface IProps {
  id: string
  title?: string
}

const props = defineProps<IProps>()
const emit = defineEmits<{
  (event: 'onClose'): void
}>()
const isVisible = defineModel<boolean>({
  required: true,
  default: false
})

const modalElementRef = ref<HTMLDialogElement>()

const modalId = computed(() => `modal-${props.id}`)

const close = () => {
  isVisible.value = false

  emit('onClose')
}

const onChangeVisibility = (isVisible: boolean) => {
  const modalElement = modalElementRef.value

  if (isVisible) {
    modalElement?.showModal()
  } else {
    modalElement?.close()
  }
}

const onCloseViaEsc = () => (isVisible.value = false)

watch(isVisible, onChangeVisibility)
</script>

<style lang="scss">
.modal {
  margin: auto;
  border: 0;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 24px;
  padding: 16px;

  &::backdrop {
    background: rgba(105, 109, 116, 0.6);
    backdrop-filter: blur(5px);
  }
}

.modal-layout {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  max-height: inherit;
}

.modal-content {
  overflow-y: auto;
}
</style>
