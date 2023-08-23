<script setup lang="ts">
import { getCurrentInstance, ref, onMounted, watch } from 'vue'
import ScollPane from './ScrollPane.vue'
import { usePermissionStore } from '@/store/modules/permission'
import { type ITagView, useTagsViewStore } from '@/store/modules/tagsView'

import { type RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import path from 'path-browserify'

const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()
const instance = getCurrentInstance()

const route = useRoute()
const router = useRouter()

const affixTags = ref<ITagView[]>([])

const selectedTag = ref<ITagView>({})

// 控制右键位置
const top = ref(0)
const left = ref(0)
const visible = ref(false)

const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
  }
}

const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: ITagView[] = []

  routes.forEach((route) => {
    if (route.meta?.affix) {
      const tagPath = path.resolve(basePath, route.path)

      const tagsItems = {
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      }

      tags.push(tagsItems)
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)

      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })

  return tags
}

const initTags = () => {
  affixTags.value = filterAffixTags(permissionStore.routes)

  for (const tag of affixTags.value) {
    if (tag.name) tagsViewStore.addVisitedView(tag)
  }
}

const closeSelectedTag = (view: ITagView) => {
  tagsViewStore.delVisitedView(view)
  tagsViewStore.delCachedView(view)
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath)
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === 'Dashboard') {
      // 重新加载主页
      router.push({ path: '/redirect' + view.path, query: view.query })
    } else {
      router.push('/')
    }
  }
}

const closeOthersTags = () => {
  if (
    selectedTag.value.fullPath !== route.path &&
    selectedTag.value.fullPath !== undefined
  ) {
    router.push(selectedTag.value.fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
  tagsViewStore.delOthersCachedViews(selectedTag.value)
}

const closeAllTags = (view: ITagView) => {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  if (affixTags.value.some((tag) => tag.path === route.path)) {
    return
  }
  toLastView(tagsViewStore.visitedViews, view)
}

watch(
  route,
  () => {
    addTags()
  },
  {
    deep: true
  }
)

const openMenu = (tag: ITagView, e: MouseEvent) => {
  const menuMinWidth = 105
  // container margin left
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // container width
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // left boundary
  const maxLeft = offsetWidth - menuMinWidth
  // 15: margin right
  const left15 = e.clientX - offsetLeft + 15
  if (left15 > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = left15
  }
  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const refreshSelectedTag = (view: ITagView) => {
  // tagsViewStore.delCachedView(view)
  router.replace({ path: '/redirect' + view.path, query: view.query })
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

const isActive = (tag: ITagView) => {
  return tag.path === route.path
}

onMounted(() => {
  initTags()
})
</script>
<template>
  <div class="tags-view-container">
    <ScollPane class="tags-view-wrapper">
      <router-link
        ref="tagRefs"
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <el-icon
          v-if="!isAffix(tag)"
          :size="12"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.tags-view-container {
  height: var(--v3-tagsview-height);
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 #00000010,
    0 0 3px 0 #00000010;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      color: var(--v3-tagsview-tag-text-color);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
        &::before {
          content: '';
          background-color: var(--v3-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
