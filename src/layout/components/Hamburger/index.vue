<script setup lang="ts">
import { ElIcon } from 'element-plus'
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'toggle-click'): void
}>()

const toggleClick = () => {
  emit('toggle-click')
}
</script>

<template>
  <div @click.prevent="toggleClick">
    <ElIcon :size="20" class="icon">
      <component :is="props.isActive ? 'Fold' : 'Expand'" />
    </ElIcon>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
