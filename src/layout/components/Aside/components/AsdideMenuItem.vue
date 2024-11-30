<template>
  <!-- 没有子节点 -->
  <template v-if="hasChild">
    <el-menu-item></el-menu-item>
  </template>
  <!-- 有子节点 -->
  <template v-else>
    有子节点
    <!-- <el-sub-menu></el-sub-menu> -->
  </template>
</template>

<script setup lang="ts">
const hasChild = ref(false)
</script>
