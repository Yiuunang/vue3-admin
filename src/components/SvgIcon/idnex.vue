<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{
      width: size,
      height: size,
    }"
  >
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
const {
  size = '1em',
  prefix = 'icon',
  iconClass = '',
  color = '',
} = defineProps<{
  size?: string
  color?: string
  iconClass?: string
  prefix?: string
}>()

const symbolId = computed(() => `#${prefix}-${iconClass}`)
</script>

<style lang="css" scoped>
.svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
    outline: none;
    fill: currentcolor;
}
</style>
