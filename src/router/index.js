/*
 * @Description: 
 * @Author: 振顺
 * @Date: 2023-11-14 10:44:46
 * @LastEditTime: 2023-11-14 10:46:53
 * @LastEditors: 振顺
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from '@/router/routes'

// 创建路由器
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
