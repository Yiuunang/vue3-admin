<template>
  <div class="aside-container">
    <el-aside class="size-full">
      <div class="aside-top">
        <div
          class="logo-box font-bold text-3xl text-blue-500 flex justify-center h-[60px] leading-[60px]"
        >
          <span v-if="isCollapse">J</span>
          <span v-else>Admin-J</span>
        </div>
      </div>
      <div class="aside-menu-box h-[calc(100%-60px)]">
        <el-scrollbar>
          <el-menu
            default-active="1"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            class="size-full main-bg text-color"
            :collapse-transition="false"
          >
            <el-menu-item index="1">
              <el-icon><HomeFilled /></el-icon>
              <template #title>Navigator One</template>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><icon-menu /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><location /></el-icon>
                <span>子级嵌套</span>
              </template>
              <el-menu-item index="4-1">4-1</el-menu-item>
              <el-menu-item index="4-2">4-2</el-menu-item>
              <el-menu-item index="4-3">4-3</el-menu-item>
              <el-sub-menu index="4-4">
                <template #title>4-4</template>
                <el-menu-item index="4-4-1">
                  <el-icon><Setting /></el-icon>
                  <span>4-4-1</span>
                </el-menu-item>
                <el-menu-item index="4-4-2">4-4-2</el-menu-item>
                <el-menu-item index="4-4-3">4-4-3</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { usePermissionStore } from '@/stores/modules/permission'
import { useAppStore } from '@/stores/modules/app'
import { AsideStatusEnum } from '@/enums/AsideStatusEnum'

const permissionStore = usePermissionStore()
const menuList = permissionStore.allRouter
console.warn(menuList)

const appStore = useAppStore()
const isCollapse = computed(() => (appStore.asideStatus === AsideStatusEnum.OPEN ? false : true))

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="css" scoped>
.aside-container aside {
    width: 100%
}
</style>
