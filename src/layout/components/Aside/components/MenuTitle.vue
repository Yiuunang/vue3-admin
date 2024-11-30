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
  <!-- title -->
  <span
    v-if="title"
    class="ml-1"
  >
    {{ title }}
  </span>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/idnex.vue'
const { icon, title } = defineProps<{
  icon: string
  title: string
}>()
</script>

<style lang="css" scoped>
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  color: currentcolor;
}

.hideSidebar {

  .el-sub-menu,
  .el-menu-item {

    .svg-icon,
    .sub-el-icon {
      margin-left: 20px;
    }
  }
}
</style>
