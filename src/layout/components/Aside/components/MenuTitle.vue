<template>
  <el-icon
    v-if="icon && icon.startsWith('el-icon')"
    class="sub-el-icon"
  >
    <component :is="icon.replace('el-icon-', '')"></component>
  </el-icon>
  <svg-icon
    v-else-if="icon"
    :icon-class="icon"
  ></svg-icon>
  <svg-icon
    v-else
    icon-class="menu"
  />
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/idnex.vue'
const { icon, title } = defineProps<{
  icon: string
  title: string
}>()
</script>
