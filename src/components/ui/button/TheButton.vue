<template>
  <button :type="props.type" class="button" :disabled="disabled">
    <slot />
  </button>
</template>
<script setup lang="ts">
interface IProps {
  type?: HTMLButtonElement['type']
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium'
})
</script>
<style lang="scss">
.button {
  border: 0;
  padding: 13.5px 32px;
  transition-property: background-color, color, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 800;
  color: #fff;
  background-color: #4b4848;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: #0f0c0c;
  }

  &:disabled {
    background-color: #6e6e6e;
  }
}
</style>
