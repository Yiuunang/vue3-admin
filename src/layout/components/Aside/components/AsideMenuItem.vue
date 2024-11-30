<script setup lang="ts">
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import { isExternalLink } from '@/utils'
import MenuTitle from './MenuTitle.vue'

defineOptions({
  name: 'AsideMenuItem',
  inheritAttrs: false,
})

const props = defineProps({
  /** 当前路由的相对路径 */
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  /** 父级完整路径 */
  basePath: {
    type: String,
    required: true,
  },
  /** 是否为嵌套路由 */
  isNest: {
    type: Boolean,
    default: false,
  },
})

// 可见的唯一子节点
const onlyOneChild = ref<RouteRecordRaw & { noShowingChildren?: boolean }>()
/**
 * 检查是否只有一个可见子节点
 * @param children 子路由数组
 * @param parent 父级路由
 * @returns 是否仅有一个可见子节点
 */
function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
  // 过滤出可见子节点
  const showingChildren = children.filter((r) => {
    if (!r.meta?.hidden) {
      onlyOneChild.value = r
      return true
    }
    return false
  })

  // 只有一个子节点
  if (showingChildren.length === 1) {
    return true
  }

  // 没有子节点 → 设置父节点为唯一子节点展示
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
/**
 * 获取完整路径，适配外部链接
 * @param routePath 路由路径
 * @returns 绝对路径
 */
function getFullPath(routePath: string) {
  if (isExternalLink(routePath)) return routePath
  const basePath = props.basePath
  if (isExternalLink(basePath)) return basePath

  return path.resolve(basePath, routePath)
}
</script>

<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 【叶子节点】显示叶子节点 或 唯一子节点且父节点未配置始终显示 -->
    <template
      v-if="
        // 展示条件：仅有一个子节点，且父节点未配置始终显示
        (hasOneShowingChild(item.children, item) &&
          (!onlyOneChild?.children || onlyOneChild.noShowingChildren) &&
          !item.meta?.alwaysShow) ||
        // 展示条件：父节点即使配置了始终显示，但无子节点，也显示为叶子节点
        (item.meta?.alwaysShow && !item.children)
      "
    >
      <AppLink
        v-if="onlyOneChild?.meta"
        :to="{
          path: getFullPath(onlyOneChild?.path as string),
          query: onlyOneChild.meta.params,
        }"
      >
        <el-menu-item
          :index="getFullPath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <MenuTitle
            :icon="(onlyOneChild.meta.icon || item.meta?.icon) as string"
            :title="onlyOneChild.meta.title as string"
          />
        </el-menu-item>
      </AppLink>
    </template>
    <!-- 【非叶子节点】显示含多个子节点的父菜单 或始 终显示的单子节点  -->
    <template v-else>
      <el-sub-menu
        :index="getFullPath(item.path)"
        teleported
      >
        <template #title>
          <MenuTitle
            v-if="item.meta"
            :icon="item.meta.icon as string"
            :title="item.meta.title as string"
          />
        </template>

        <AsideMenuItem
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="getFullPath(child.path)"
        />
      </el-sub-menu>
    </template>
  </div>
</template>

<style lang="css">
.hideSidebar {
  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }
    }

    & > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    width: 54px;

    .el-sub-menu {
      & > .el-sub-menu__title > span {
        display: inline-block;
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
}
</style>
