import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'homepage',
          affix: true,
          keepAlive: true,
        }
      },
      {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/errorPage/404.vue'),
        meta: { hidden: true },
      }
    ]
  },
  {
    path: '/form',
    name: 'Form',
    component: Layout,
    redirect: '/dynamicForm',
    meta: {
      alwaysShow: false,
      hidden: false,
      icon: "cascader",
      params: null,
      title: "表单",
    },
    children: [
      {
        path: '/myForm',
        name: 'MyForm',
        component: () => import('@/views/form/MyForm/index.vue'),
        meta: {
          title: 'ElForm',
          icon: 'cascader',
          affix: true,
        }
      },
      {
        path: '/dynamicForm',
        name: 'DynamicForm',
        component: () => import('@/views/form/DynamicForm/index.vue'),
        meta: {
          title: '动态表单',
          icon: 'cascader',
          affix: true,
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 全局注册 router
 * @param app 
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router
