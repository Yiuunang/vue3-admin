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

  <!-- test-pinia -->
  <div>
    store count in App: {{ counterStore.count }}
  </div>
  <el-button type="primary" @click="counterStore.increment">add store count</el-button>

  <hr>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();



</script>

<style scoped></style>
