import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'House',
          affix: true
        }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu1',
    name: 'Menu',
    meta: {
      title: '多级菜单',
      icon: 'Operation'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('../views/menu/menu1/index.vue'),
        name: 'Menu1',
        meta: {
          title: 'menu1'
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('../views/menu/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: {
              title: 'menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('../views/menu/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: {
              title: 'menu1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('../views/menu/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('../views/menu/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'menu1-2-2'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/menu2',
        component: () => import('../views/menu/menu2/index.vue'),
        name: 'Menu2',
        meta: {
          title: 'menu2'
        }
      }
    ]
  },
  {
    path: '/link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        component: () => {},
        name: 'Link',
        meta: {
          title: '外链',
          icon: 'Link'
        }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})
