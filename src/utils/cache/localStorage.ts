import CacheKey from '@/constants/cacheKey'

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus: 'opened' | 'closed') => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
