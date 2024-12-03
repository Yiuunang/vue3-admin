<template>
  <div @click="toggle">
    <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/idnex.vue'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>
