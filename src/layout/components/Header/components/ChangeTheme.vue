<template>
  <div
    @click="appStore.toggleThemeType"
    class="flex justify-center items-center"
  >
    <el-icon>
      <component :is="appStore.isDark ? 'Sunny' : 'Moon'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
</script>
