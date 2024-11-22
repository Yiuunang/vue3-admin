<script setup lang="ts"></script>

<template>
  <!-- 测试ELemntPlus & icon -->
  <div>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
  </div>

  <!-- test tailwind css -->
  <div class="p-3 bg-red-500 text-white">
    tailwind css
  </div>

  <RouterView></RouterView>
</template>

<style scoped></style>
