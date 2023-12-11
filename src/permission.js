/*
 * @Description:路由鉴权
 * @Author: 振顺
 * @Date: 2023-10-19 09:56:34
 * @LastEditTime: 2023-12-11 15:18:54
 * @LastEditors: 振顺
 */
// 路由鉴权,项目中路由能不能被访问的权限的设置(某一个路由什么条件下可以访问，什么条件下不可以访问)
import router from '@/router'

// 全局守卫:项目当中任意切换路由都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  //to:你将要访问那个路由
  //from:你从来个路由而来
  //next:路由的放行函数
  next()
})
// 全局后置守卫
router.afterEach((to, from) => {
  document.title = `人才大数据 - ${to.meta.title}`
})
