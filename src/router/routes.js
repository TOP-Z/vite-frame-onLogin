/*
 * @Description:
 * @Author: 振顺
 * @Date: 2023-10-13 10:05:09
 * @LastEditTime: 2023-12-11 15:04:29
 * @LastEditors: 振顺
 */
// 对外暴露配置路由(常量路由)
export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: 'HomeFilled',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  },
]
