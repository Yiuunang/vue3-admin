<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          访问趋势
          <el-tooltip
            effect="dark"
            content="点击试试下载"
            placement="bottom"
          >
            <el-icon
              class="cursor-pointer hover:text-[#4080FF] ml-1"
              name="el-icon-download"
              @click="handleDownloadChart"
            >
              <Download />
            </el-icon>
          </el-tooltip>
        </div>

        <el-radio-group
          v-model="recentDaysRange"
          size="small"
          @change="handleDateRangeChange"
        >
          <el-radio-button
            label="近7天"
            :value="7"
          />
          <el-radio-button
            label="近30天"
            :value="30"
          />
        </el-radio-group>
      </div>
    </template>

    <div
      :id="id"
      :class="className"
      :style="{ height, width }"
    />
  </el-card>
</template>

<script setup lang="ts">
import { logApi } from '@/api/log/api'
import type { VisitTrendVO } from '@/api/log/type'
import userChartResize from '@/hooks/useChartResize'
import { downloadImgByA } from '@/utils/downloadImg'
import type { ECOption } from '@/utils/eCharts'
import dayjs from 'dayjs'

const props = defineProps({
  id: {
    type: String,
    default: 'VisitTrend',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
})

// 日期范围
const recentDaysRange = ref<7 | 30>(7)

let chart: any
const { initChart, setChartOption } = userChartResize(props.id)

// 加载表格数据
const loadData = async () => {
  const endDate = new Date()
  const startDate = dayjs()
    .subtract(recentDaysRange.value - 1, 'day')
    .toDate()

  const visitTrendQuery = {
    startDate: dayjs(startDate).format('YYYY-MM-DD'),
    endDate: dayjs(endDate).format('YYYY-MM-DD'),
  }

  try {
    const res = await logApi.getVisitTrend(visitTrendQuery)
    const data = res.data
    if (data) {
      setChartOptions(data)
    }
  } catch (error) {}
}

/** 设置图表  */
const setChartOptions = (data: VisitTrendVO) => {
  if (!chart) return
  const options: ECOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['浏览量(PV)', 'IP'],
      bottom: 0,
    },
    grid: {
      left: '1%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.dates,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '浏览量(PV)',
        type: 'line',
        data: data.pvList,
        areaStyle: {
          color: 'rgba(64, 158, 255, 0.1)',
        },
        smooth: true,
        itemStyle: {
          color: '#4080FF',
        },
        lineStyle: {
          color: '#4080FF',
        },
      },
      {
        name: 'IP',
        type: 'line',
        data: data.ipList,
        areaStyle: {
          color: 'rgba(103, 194, 58, 0.1)',
        },
        smooth: true,
        itemStyle: {
          color: '#67C23A',
        },
        lineStyle: {
          color: '#67C23A',
        },
      },
    ],
  }

  setChartOption(options)
}

/* 下载 chart */
const handleDownloadChart = () => {
  if (!chart) return
  // 获取画布图表地址信息
  const imgUrl = chart.getDataURL({
    type: 'png',
    pixelRatio: 1,
    backgroundColor: '#fff',
  })
  downloadImgByA(imgUrl, '访问趋势')
}

/* 切换周期 */
const handleDateRangeChange = () => {
  loadData()
}

// 初始化图表
onMounted(() => {
  // markRaw 是一个工具函数，用于防止一个对象被 Vue 的响应式系统处理。
  chart = initChart()
  loadData()
})
</script>
