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
    <div class="header-right flex justify-center items-center h-[100%]">
      <!-- 全屏 -->
      <FullScreen class="mr-[10px] p-1 cursor-pointer hover-bg" />
      <!-- 主题 -->
      <ChangeTheme class="mr-[10px] p-1 cursor-pointer hover-bg" />
      <!-- 头像 -->
      <UserProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { Expand, Fold } from '@element-plus/icons-vue'
import UserProfile from './components/UserProfile.vue'
import FullScreen from './components/FullScreen.vue'
import ChangeTheme from './components/ChangeTheme.vue'

const appStore = useAppStore()
</script>
