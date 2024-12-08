<template>
  <div v-if="formItem">
    <!-- 根据表单类型渲染不同表单项 -->
    <input
      v-if="formItem.type === 'input'"
      v-model="formItem.payload.value"
      :placeholder="formItem.payload.label"
    />
    <select
      v-if="formItem.type === 'select'"
      v-model="formItem.payload.value"
    >
      <option
        v-for="option in formItem.payload.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- 渲染下一个表单 -->
    <FormItemCom
      v-if="nextFormItem"
      :form-item="nextFormItem"
    />
  </div>
</template>

<script setup lang="ts">
import type { FormItem } from './type'

const { formItem } = defineProps<{
  formItem: FormItem
}>()

const nextFormItem = computed(() => formItem.next(formItem))
</script>
