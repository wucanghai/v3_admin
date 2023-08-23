<script setup lang="ts">
import { ElScrollbar, ElIcon } from 'element-plus'
import Screenfull from '@/components/Screenfull/index.vue'
</script>
<template>
  <div class="scroll-container">
    <ElIcon class="arrow left">
      <ArrowLeft />
    </ElIcon>
    <ElScrollbar>
      <div ref="scrollbarContentRef" class="scrollbar-content"><slot /></div>
    </ElScrollbar>
    <el-icon class="arrow right">
      <ArrowRight />
    </el-icon>
    <Screenfull element=".app-main" openTips="内容区全屏" class="screenfull" />
  </div>
</template>

<style scoped lang="scss">
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 40px;
    height: 100%;
    cursor: pointer;
    &.left {
      box-shadow: 5px 0 5px -6px #ccc;
    }
    &.right {
      box-shadow: -5px 0 5px -6px #ccc;
    }
  }

  :deep(.el-scrollbar) {
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .el-scrollbar {
    flex: 1;
    // 横向超出窗口长度时，显示滚动条
    white-space: nowrap;
    .scrollbar-content {
      display: inline-block;
    }
  }
  .screenfull {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
