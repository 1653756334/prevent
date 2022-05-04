import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/info',
    component: Layout,
    redirect: '/info/shared',
    name: 'Info',
    meta: { title: '信息收集管理', icon: 'table' },
    children: [
      {
        path: 'shared',
        name: 'Shared',
        component: () => import('@/views/info/shared/index'),
        meta: { title: '部门共享数据管理'}
      },
      {
        path: 'self-report',
        name: 'SelfReport',
        component: () => import('@/views/info/selfReport/index'),
        meta: { title: '自主上报数据管理'},
        redirect: '/info/self-report/accept',
        children: [
          {
            path: 'accept',
            name: 'Accept',
            component: () => import('@/views/info/selfReport/accept/index'),
            meta: { title: '自主上报信息受理'}
          },
          {
            path: 'reslut',
            name: 'Reslut',
            component: () => import('@/views/info/selfReport/reslut/index'),
            meta: { title: '自主上报信息办结'}
          }
        ]
      }
    ]
  },

  {
    path: '/attention',
    component: Layout,
    meta: { title: '返贫预警管理', icon: 'form' },
    children: [
      {
        path: 'level',
        name: 'Level',
        component: () => import('@/views/attention/level/index'),
        meta: { title: '返贫预警分级管理'}
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/attention/monitor/index'),
        meta: { title: '监测预警信息管理'}
      }
    ]
  },

  {
    path: '/check',
    component: Layout,
    redirect: '/check/query',
    name: 'Check',
    meta: {
      title: '入户核实管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'query',
        component: () => import('@/views/check/query/index'), // Parent router-view
        name: 'Query',
        meta: { title: '入户核实进度查询' }
      },
      {
        path: 'feedback',
        component: () => import('@/views/check/feedback/index'),
        name: 'Feedback',
        meta: { title: '入户核实反馈管理' }
      }
    ]
  },

  {
    path: '/support',
    component: Layout,
    meta: { title: '易返贫帮扶管理', icon: 'tree' },
    redirect: '/support/query',
    children: [
      {
        path: 'query',
        component: () => import('@/views/support/query/index'),
        name: 'SuportQuery',
        meta: { title: '帮扶对象信息查询'}
      },
      {
        path: 'manege',
        component: () => import('@/views/support/manege/index'),
        name: 'Manege',
        meta: { title: '帮扶对象信息管理'}
      },
      {
        path: 'solution',
        component: () => import('@/views/support/solution/index'),
        name: 'Solution',
        meta: { title: '行业单位帮扶措施管理'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
