<template>
  <div
    class="aside-container"
    :style="{
      width: appStore.asideIsCollapse ? 'auto' : '200px',
    }"
  >
    <el-aside class="size-full">
      <div class="aside-top">
        <div
          class="logo-box font-bold text-3xl text-blue-500 flex justify-center h-[60px] leading-[60px]"
        >
          <span v-if="appStore.asideIsCollapse">J</span>
          <span v-else>Admin-J</span>
        </div>
      </div>
      <div class="aside-menu-box h-[calc(100%-60px)]">
        <el-scrollbar>
          <AsdideMenu
            :menu-list="menuList"
            base-path=""
          />
        </el-scrollbar>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/stores/modules/permission'
import { useAppStore } from '@/stores/modules/app'
import AsdideMenu from './components/AsideMenu.vue'

const permissionStore = usePermissionStore()
const menuList = permissionStore.allRouter

const appStore = useAppStore()
</script>

<style lang="css" scoped>
.aside-container {
  flex-shrink: 0;
}
.aside-container aside {
    width: 100%
}
</style>
