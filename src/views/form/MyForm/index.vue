<template>
  <el-form
    ref="formRef"
    :model="datas"
    style="max-width: 600px"
    label-width="auto"
    size="default"
    status-icon
  >
    <!-- input -->
    <el-form-item
      label="name"
      prop="name"
      :rules="nameRules"
    >
      <el-input v-model="datas.name" />
    </el-form-item>

    <!-- select -->
    <el-form-item
      label="age(select)"
      prop="age"
    >
      <el-select
        v-model="datas.age"
        placeholder="Please select age"
      >
        <el-option
          label="十八"
          value="18"
        ></el-option>
        <el-option
          label="二十二"
          value="22"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- select-v2 -->
    <el-form-item
      label="count"
      prop="count"
    >
      <el-select-v2
        v-model="datas.count"
        placeholder="place select count"
        :options="countOptions"
      />
    </el-form-item>

    <!-- date & time picker -->
    <el-form-item label="时间">
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker
            v-model="datas.date"
            aria-label="请选择日期"
            label="请选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        :span="2"
        class="text-center"
      >
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="time">
          <el-time-picker
            v-model="datas.time"
            aria-label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>

    <!-- swtich -->
    <el-form-item
      label="是否是VIP"
      prop="isVip"
    >
      <el-switch v-model="datas.isVip"></el-switch>
    </el-form-item>

    <el-form-item
      label="location"
      prop="location"
    >
      <el-segmented
        v-model="datas.location"
        :options="locationOptions"
      ></el-segmented>
    </el-form-item>

    <!-- checkbox -->
    <el-form-item
      label="类型"
      prop="type"
    >
      <el-checkbox-group v-model="datas.type">
        <el-checkbox
          v-for="item in allTypes"
          :key="item.id"
          :value="item.value"
          name="type"
        >
          {{ item.title }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <!-- radiio -->
    <el-form-item
      label="radio"
      prop="resource"
    >
      <el-radio-group v-model="datas.resource">
        <el-radio value="Sponsorship">Sponsorship</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- textarea -->
    <el-form-item
      label="描述"
      prop="desc"
    >
      <el-input
        v-model="datas.desc"
        type="textarea"
      ></el-input>
    </el-form-item>

    <!-- button -->
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(formRef)"
      >
        Create
      </el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>

  <div>datas: {{ datas }}</div>
</template>

<script setup lang="ts">
import type { FormItemRule, FormRules } from 'element-plus'

const formRef = ref(null)

const datas = ref({
  name: '',
  age: '',
  count: '',
  date: '',
  time: '',
  isVip: '',
  location: '',
  type: [],
  resource: '',
  desc: '',
})

const nameRules = ref<FormItemRule[]>([
  { required: true, message: 'Please input name', trigger: 'blur' },
  { min: 2, message: 'min length is 2', trigger: 'blur' },
  { max: 10, message: 'max length is 10', trigger: 'blur' },
])

const countOptions = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const allTypes = [
  { id: 1, title: 'Online activities', value: 'Online activities' },
  { id: 2, title: 'Promotion activities', value: 'Promotion activities' },
  { id: 3, title: 'Offline activities', value: 'Offline activities' },
  { id: 4, title: 'Simple brand exposure', value: 'Simple brand exposure' },
]

const locationOptions = ['Home', 'Company', 'School']

const submitForm = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: any) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
