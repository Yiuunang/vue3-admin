<template>
  <div class="header-container size-full flex justify-between items-center">
    <div
      class="change-aside-bar-btn size-[20px] p-x-[10px] hover-bg cursor-pointer rounded-sm text-center"
      @click="appStore.toggleAsideStatus"
    >
      <el-icon class="text-color">
        <Expand v-if="appStore.asideIsCollapse" />
        <Fold v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { Expand, Fold } from '@element-plus/icons-vue'

const appStore = useAppStore()
</script>
