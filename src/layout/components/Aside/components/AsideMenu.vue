<template>
  <el-menu
    ref="menuRef"
    :default-active="route.path"
    :collapse="appStore.asideIsCollapse"
    class="size-full main-bg text-color"
    :unique-opened="false"
    :collapse-transition="false"
  >
    <AsideMenuItem
      v-for="r in menuList"
      :key="r.path"
      :item="r"
      :base-path="getFullPath(r.path)"
    />
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuInstance } from 'element-plus'
import path from 'path-browserify'
import { isExternalLink } from '@/utils'
import { useAppStore } from '@/stores/modules/app'
import { useRoute, type RouteRecordRaw } from 'vue-router'
import AsideMenuItem from './AsideMenuItem.vue'
// 接收的属性
const props = defineProps({
  menuList: {
    type: Array<RouteRecordRaw>,
    required: true,
    default: () => [],
  },
  basePath: {
    type: String,
    required: true,
    example: '/system',
  },
})

const menuRef = ref<MenuInstance>()
const route = useRoute()
const appStore = useAppStore()

/**
 * 获取完整路径
 * @param routePath 当前路由的相对路径  /user
 * @returns 完整的绝对路径 D://vue3-admin/system/user
 */
function getFullPath(routePath: string) {
  if (isExternalLink(routePath)) return routePath
  const basePth = props.basePath
  if (isExternalLink(basePth)) return basePth

  // 解析路径，生成完整的绝对路径
  return path.resolve(basePth, routePath)
}
</script>
