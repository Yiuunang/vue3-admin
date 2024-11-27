<template>
  <div class="aside-container">
    <el-aside class="w-full">
      <div class="logo-box font-bold text-3xl text-blue-500 flex justify-center">
        <span v-if="isCollapse">Admin-J</span>
        <span v-else>J</span>
      </div>
      <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px"
      >
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
      </el-radio-group>
      <div class="aside-menu-box">
        <el-scrollbar>
          <el-menu
            default-active="2"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          ></el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
const isCollapse = ref(true)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="css" scoped>
.aside-container aside {
    width: 100%
}
</style>
