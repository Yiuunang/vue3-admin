<template>
  <div class="dashboard-container p-[24px]">
    <!-- 信息卡片 -->
    <el-card>
      <el-row>
        <el-col
          :span="16"
          :xs="24"
        >
          <div class="flex h-full items-center">
            <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="userStore.userInfo.avatar"
            />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm">今日天气晴朗，气温在15℃至25℃之间，东南风。</p>
            </div>
          </div>
        </el-col>
        <el-col
          :span="8"
          :xs="24"
        >
          <div class="flex h-full items-center justify-around">
            <el-statistic
              v-for="item in statisticData"
              :key="item.key"
              :value="item.value"
            >
              <template #title>
                <div class="flex items-center">
                  <svg-icon
                    :icon-class="item.iconClass"
                    size="20px"
                  />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据卡片 -->
    <el-row
      :gutter="10"
      class="mt-5"
    >
      <el-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <el-card>
          <template #header>
            <div class="flex justify-between">
              <span>在线用户</span>
              <el-tag
                type="success"
                size="small"
              >
                -
              </el-tag>
            </div>
          </template>
          <div class="flex justify-between mt-2">
            <span class="text-lg">{{ onlineUserCount }}</span>
            <svg-icon
              icon-class="user"
              size="2em"
            />
          </div>
          <div class="flex justify-between mt-2 text-sm">
            <span>总用户数</span>
            <span>5</span>
          </div>
        </el-card>
      </el-col>
      <!-- 请求回来的卡片 没数据时展示骨架屏 -->
      <el-col
        v-for="(item, index) in visitStatsList"
        :key="index"
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <el-skeleton
          :loading="visitStatsLoading"
          animated
        >
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item
                    variant="h3"
                    style="width: 40%"
                  />
                  <el-skeleton-item
                    variant="rect"
                    style="float: right; width: 1em; height: 1em"
                  />
                </div>
              </template>

              <div class="flex justify-between">
                <el-skeleton-item
                  variant="text"
                  style="width: 30%"
                />
                <el-skeleton-item
                  variant="circle"
                  style="width: 2em; height: 2em"
                />
              </div>
              <div class="mt-5 flex justify-between">
                <el-skeleton-item
                  variant="text"
                  style="width: 50%"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 1em"
                />
              </div>
            </el-card>
          </template>

          <template #default>
            <el-card shadow="never">
              <template #header>
                <div class="flex justify-between">
                  <span>
                    {{ item.title }}
                  </span>
                  <el-tag
                    :type="item.tagType"
                    size="small"
                  >
                    {{ item.granularity }}
                  </el-tag>
                </div>
              </template>

              <div class="flex justify-between mt-2">
                <div class="felx items-center">
                  <span class="text-lg">{{ item.todayCount }}</span>
                  <span :class="['text-xs', 'ml-2', getGrowthRateClass(item.growthRate)]">
                    <el-icon>
                      <Top v-if="item.growthRate > 0" />
                      <Bottom v-else-if="item.growthRate < 0" />
                    </el-icon>
                    {{ formatGrowthRate(item.growthRate) }}
                  </span>
                </div>
                <svg-icon
                  :icon-class="item.icon"
                  size="2em"
                />
              </div>

              <div class="flex-x-between mt-2 text-sm">
                <span>总{{ item.title }}</span>
                <span>{{ item.totalCount }}</span>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

    <!-- 趋势图 & 通告 -->
    <el-row
      :gutter="10"
      class="mt-5"
    >
      <el-col
        :xs="24"
        :span="16"
      >
        <VisitTrend
          id="VisitTrend"
          width="100%"
          height="400px"
        />
      </el-col>
      <el-col
        :xs="24"
        :span="8"
      >
        <el-card>
          <template #header>
            <div class="flex justify-between">
              <div class="flex items-center">通知公告</div>
              <el-link type="primary">
                <span
                  class="text-xs"
                  @click="viewMoreNotice"
                >
                  查看更多
                </span>
                <el-icon class="text-xs">
                  <ArrowRight />
                </el-icon>
              </el-link>
            </div>
          </template>

          <el-scrollbar height="400px">
            <div
              v-for="(item, index) in notices"
              :key="index"
              class="flex items-center py-3"
            >
              <el-text
                truncated
                class="!mx-2 flex-1 !leading-5 !text-xs !text-[--el-text-color-secondary]"
              >
                {{ item.title }}
              </el-text>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import SvgIcon from '@/components/SvgIcon/idnex.vue'
import { logApi } from '@/api/log/api'
import { noticeApi } from '@/api/notice/api'
import type { UserNoticePageVO } from '@/api/notice/type'
import VisitTrend from './components/VisitTrend.vue'

const userStore = useUserStore()
const greetings = computed(() => {
  const hours = new Date().getHours()
  if (hours >= 6 && hours < 8) {
    return '晨起披衣出草堂，轩窗已自喜微凉🌅！'
  } else if (hours >= 8 && hours < 12) {
    return '上午好，' + userStore.userInfo.nickname + '！'
  } else if (hours >= 12 && hours < 18) {
    return '下午好，' + userStore.userInfo.nickname + '！'
  } else if (hours >= 18 && hours < 24) {
    return '晚上好，' + userStore.userInfo.nickname + '！'
  } else {
    return '偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！'
  }
})

// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: 'message',
    title: '消息',
    key: 'message',
  },
  {
    value: 50,
    iconClass: 'todo',
    title: '待办',
    suffix: '/100',
    key: 'upcoming',
  },
  {
    value: 10,
    iconClass: 'project',
    title: '项目',
    key: 'project',
  },
])

// 在线人数
const onlineUserCount = ref(0)

interface VisitStats {
  title: string
  icon: string
  tagType: 'primary' | 'success' | 'warning'
  growthRate: number
  // 粒度
  granularity: string
  // 今日数量
  todayCount: number
  totalCount: number
}
// 访问数据是否在加载
const visitStatsLoading = ref(true)
// 访问数据
const visitStatsList = ref<VisitStats[] | null>(Array(3).fill({}))
// 加载访问统计数据
const loadVisitStatsData = async () => {
  const res = await logApi.getVisitStats()
  const list = res.data

  if (list) {
    const tagTypes: ('primary' | 'success' | 'warning')[] = ['primary', 'success', 'warning']
    visitStatsList.value = list.map((item, index) => ({
      title: item.title,
      icon: getVisitStatsIcon(item.type),
      tagType: tagTypes[index % tagTypes.length],
      growthRate: item.growthRate,
      granularity: '日',
      todayCount: item.todayCount,
      totalCount: item.totalCount,
    }))

    visitStatsLoading.value = false
  }
}
/** 获取访问统计图标 */
const getVisitStatsIcon = (type: string) => {
  switch (type) {
    case 'pv':
      return 'pv'
    case 'uv':
      return 'uv'
    case 'ip':
      return 'ip'
    default:
      return 'pv'
  }
}
/** 获取增长率文本颜色类 */
const getGrowthRateClass = (growthRate: number): string => {
  let color = 'text-[--el-color-info]'
  if (growthRate > 0) {
    color = 'text-[--el-color-danger]'
  } else if (growthRate < 0) {
    color = 'text-[--el-color-success]'
  }
  return color
}
/** 格式化增长率 */
const formatGrowthRate = (growthRate: number): string => {
  if (growthRate === 0) {
    return '-'
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, '')
  return formattedRate + '%'
}

/* 查看更多 */
const viewMoreNotice = () => {}

const notices = ref<UserNoticePageVO[]>([])

onMounted(async () => {
  loadVisitStatsData()

  try {
    const { data } = await noticeApi.getMyNoticePage({ pageNum: 1, pageSize: 10 })
    if (data) {
      notices.value = data.list
    }
  } catch (error) {}
})
</script>
