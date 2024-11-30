<template>
  <component
    :is="linkType"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternalLink } from '@/utils'

defineOptions({
  name: 'AppLink',
  inheritAttrs: false,
})

const props = defineProps<{
  to: {
    path: string
    query: any
  }
}>()

// 是否是外部链接
const isExternal = computed(() => isExternalLink(props.to.path || ''))
const linkType = computed(() => (isExternal.value ? 'a' : 'RouterLink'))

const linkProps = (to: any) => {
  if (isExternal.value) {
    return {
      href: to.path,
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }
  return { to }
}
</script>
