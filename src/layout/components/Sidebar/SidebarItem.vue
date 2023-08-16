<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { type RouteRecordRaw } from 'vue-router'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import SidebarItem from './SidebarItem.vue'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
import path from 'path-browserify'

const props = defineProps({
  items: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    required: true
  },
  isCollapse: {
    type: Boolean,
    required: true
  },
  isFirstLevel: {
    type: Boolean,
    required: true
  }
})

const showingChildNumber = computed(() => {
  if (props.items.children) {
    const showingChildren = props.items.children.filter((item) => {
      return !(item.meta && item.meta.hidden)
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.items.children) {
    for (const child of props.items.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  return { ...props.items, path: '' }
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }

  return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <div
    v-if="!props.items.meta?.hidden"
    :class="{
      'simple-mode': props.isCollapse,
      'first-level': props.isFirstLevel
    }"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <ElMenuItem :index="resolvePath(theOnlyOneChild.path)">
          <template v-if="theOnlyOneChild.meta?.icon">
            <ElIcon><component :is="theOnlyOneChild.meta?.icon" /></ElIcon>
          </template>
          <template v-if="theOnlyOneChild.meta?.title" #title>
            {{ theOnlyOneChild.meta?.title }}
          </template>
        </ElMenuItem>
      </SidebarItemLink>
    </template>

    <ElSubMenu v-else :index="resolvePath(props.items.path)" teleported>
      <template #title>
        <template v-if="props.items.meta?.icon">
          <ElIcon><component :is="props.items.meta?.icon" /></ElIcon>
        </template>
        <span>{{ props.items.meta?.title }}</span>
      </template>
      <template v-if="props.items.children">
        <SidebarItem
          v-for="child in props.items.children"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          :is-collapse="props.isCollapse"
          :items="child"
          :isFirstLevel="false"
        />
      </template>
    </ElSubMenu>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
