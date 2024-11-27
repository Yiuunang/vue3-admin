<template>
  仪表盘
  <button @click="loginOut">登出</button>
  <button @click="getInfo">获取用户信息</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
const loginOut = async () => {
  await userStore.loginOut()
  router.push({
    name: 'Login',
    query: {
      redirect: route.fullPath, // 将当前路由的完整路径作为重定向参数
    },
  })
}

const getInfo = async () => {
  await userStore.getUserInfo()
}
</script>
