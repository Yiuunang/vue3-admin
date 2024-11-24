<template>
  仪表盘
  <button @click="loginOut">登出</button>
  <button @click="getInfo">获取用户信息</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const loginOut = async () => {
  userStore.loginOut()
}

const getInfo = async () => {
  userStore.getUserInfo()
}
</script>
