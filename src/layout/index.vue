<script setup lang="ts">
import { computed } from 'vue'
import { Sliderbar, AppMain, NavigationBar, TagsView } from './components'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened
  }
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <Sliderbar class="sidebar-container" />
    <div :class="{ hasTagsView: true }" class="main-container">
      <div :class="{ 'fixed-header': true }">
        <NavigationBar />
        <TagsView v-show="true" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}
</style>
