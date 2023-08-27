import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const roles = ref<string[]>([])

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  return { setRoles }
})
