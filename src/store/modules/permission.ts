import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'

export const usePermission = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])

  routes.value = constantRoutes

  return {
    routes
  }
})
