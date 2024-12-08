<template>
  <div class="aynamicForm">
    <FormItemCom :form-item="formItem1"></FormItemCom>
  </div>
</template>

<script setup lang="ts">
import { createFormItem } from './create'
import FormItemCom from './FormItemCom.vue'

const formItem1 = createFormItem({
  type: 'input',
  payload: {
    label: 'test1',
    value: '',
  },
  next: (current) => (current.payload.value === 'test1' ? formItem2 : null),
})

const formItem2 = createFormItem({
  type: 'select',
  payload: {
    label: 'test2',
    options: [
      { label: 'test2-1', value: 'test2-1' },
      { label: 'test2-2', value: 'test2-2' },
      { label: 'test2-3', value: 'test2-3' },
    ],
    value: 'test2-1',
  },
  next: (current) => {
    switch (current.payload.value) {
      case 'test2-1':
        return null
      case 'test2-2':
        return null
      default:
        return null
    }
  },
})

// const formItem3 = createFormItem({

// })
</script>
