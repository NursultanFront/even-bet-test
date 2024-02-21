<template>
  <div class="loader-wrapper">
    <img :src="LoaderIcon" class="loader" />
  </div>
</template>
<script setup lang="ts">
import LoaderIcon from '@/assets/images/svg/icons/progress.svg'
</script>
<style lang="scss">
.loader-wrapper {
  display: flex;
  align-items: center;
}

.loader {
  animation-duration: 1s;
  animation-name: rotation;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
