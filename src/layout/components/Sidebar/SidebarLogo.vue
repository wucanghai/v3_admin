<script setup lang="ts">
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="slider-logo-container" :class="{ collapse: props.collapse }">
    <router-link v-if="props.collapse" to="/">
      <img src="@/assets/layout/logo.png" class="sidebar-logo" />
    </router-link>
    <router-link v-else key="expand" to="/">
      <img src="@/assets/layout/logo-text-1.png" class="sidebar-logo-text" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.slider-logo-container {
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    display: none;
  }

  .sidebar-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .sidebar-logo-text {
    display: none;
  }
}
</style>
