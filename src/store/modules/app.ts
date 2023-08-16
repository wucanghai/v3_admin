import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface ISidebar {
  opened: boolean
  withoutAnimation: boolean
}

export const useAppStore = defineStore('app', () => {
  const sidebar: ISidebar = reactive({
    opened: true,
    withoutAnimation: false
  })

  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
    // if (sidebar.opened) {
    //   setSidebarStatus("opened")
    // } else {
    //   setSidebarStatus("closed")
    // }
  }

  return {
    sidebar,
    toggleSidebar
  }
})
