<template>
  <el-dropdown
    trigger="click"
    class="h-[100%]"
  >
    <div class="el-dropdown-link h-[100%] flex justify-center items-center hover-bg px-1">
      <img
        :src="userStore.userInfo.avatar"
        class="rounded-full mr-[10px] size-[30px]"
      />
      <span>{{ userStore.userInfo.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="gotoUserInfo">个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

/**
 * 跳转到个人中心
 */
const gotoUserInfo = () => {
  // todo 待实现
}

/**
 * 退出
 */
const logout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await userStore.loginOut()
      router.push({
        name: 'Login',
        query: {
          redirect: route.fullPath, // 将当前路由的完整路径作为重定向参数
        },
      })
    } catch (error) {}
  })
}
</script>
