<template>
  <div class="common-layout size-full main-bg text-color">
    <el-container class="size-full">
      <Aside class="h-full main-bg" />
      <el-container class="w-[calc(100% - 210px)] h-full">
        <el-header class="w-full h-[50px]">
          <Header />
        </el-header>
        <el-main class="w-full h-[calc(100% - 50px)] content-bg">
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'
</script>
<style lang="css" scoped></style>
