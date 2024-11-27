<template>
  <div
    class="login-container size-full flex items-center justify-center bg-gradient-to-tr from-indigo-800 to-blue-400"
  >
    <div class="login-card w-[420px] h-[500px] p-[30px] bg-indigo-50/90 rounded-md shadow-lg">
      <h2 class="title text-center font-bold text-2xl mt-5 mb-5">登录</h2>
      <el-form
        ref="formRef"
        class="login-from w-full"
        label-position="left"
        label-width="auto"
        :rules="rules"
        :model="formData"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            class="h-[48px]"
            size="large"
            v-model="formData.username"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            class="h-[48px]"
            size="large"
            type="password"
            show-password
            v-model="formData.password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="captchaCode"
        >
          <div class="w-full flex items-center">
            <el-input
              ref="captchaInput"
              auto-complete="off"
              class="h-[48px] flex-1 captcha-input rounded-none"
              size="large"
              v-model="formData.captchaCode"
              :prefix-icon="InfoFilled"
            />
            <el-image
              :src="captchaBase64"
              class="h-[46px] cursor-pointer rounded-tr-[4px] rounded-br-[4px]"
              @click="getCaptcha(true)"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loadingStatus"
            class="w-full"
            size="large"
            @click.prevent="login"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authApi } from '@/api/auth/api'
import type { LoginParams } from '@/api/auth/type'
import { useUserStore } from '@/stores/modules/user'
import { User, Lock, InfoFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

// 表单
const formRef = ref<FormInstance>()
// 验证码输入框
const captchaInput = ref()

// 表单内容
const formData = ref<LoginParams>({
  username: '',
  password: '',
  captchaKey: '',
  captchaCode: '',
})

// 表单验证规则
const rules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

// 验证码
const captchaBase64 = ref('')
// 获取验证码
const getCaptcha = async (isFoucs: boolean = false) => {
  const { data } = await authApi.getCapacha()
  if (data) {
    captchaBase64.value = data.captchaBase64
    formData.value.captchaKey = data.captchaKey
    if (isFoucs) {
      captchaInput.value?.focus()
    }
  }
}

const route = useRoute()
const router = useRouter()
// 登录状态
const loadingStatus = ref(false)
const userStore = useUserStore()
const login = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (loadingStatus.value) return
      try {
        await userStore.login(formData.value)
        await userStore.getUserInfo()
        const { path, queryParams } = parseRedirect()
        router.push({ path, query: queryParams })
      } catch (error) {
        getCaptcha(true)
      }
      loadingStatus.value = false
    }
  })
}

function parseRedirect() {
  const query = route.query
  const redirect = query.redirect as string

  const url = new URL(redirect, window.location.origin)
  const path = url.pathname
  const queryParams: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  return { path, queryParams }
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="css" scoped>
.el-form-item {
  align-items: center; /* 让 label 和输入框居中对齐 */
}
::v-deep(.captcha-input>.el-input__wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

::v-deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: none;
}

::v-deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

::v-deep(.el-input__wrapper:hover) {
    box-shadow: none;
}
</style>
