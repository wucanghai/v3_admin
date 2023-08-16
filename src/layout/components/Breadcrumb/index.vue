<script setup lang="ts">
import { computed } from 'vue'
import {
  type RouteLocationMatched,
  ElBreadcrumb,
  ElBreadcrumbItem
} from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  return route.matched.filter((items) => {
    return items.meta && items.meta.title && items.meta.breadcrumb !== false
  })
})

const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    return router.push(redirect as string)
  }

  return router.push(pathCompile(path))
}
</script>
<template>
  <ElBreadcrumb class="app-breadcrumb">
    <ElBreadcrumbItem v-for="(item, index) in breadcrumbs" :key="item.path">
      <span
        v-if="
          item.redirect === 'noRedirect' || index === breadcrumbs.length - 1
        "
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
