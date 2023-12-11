/*
 * @Description:
 * @Author: 振顺
 * @Date: 2023-12-11 11:23:36
 * @LastEditTime: 2023-12-11 15:19:12
 * @LastEditors: 振顺
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from '@/router'
// 引入仓库
import pinia from '@/store'
// 引入组件
import allGloablComponent from '@/components'
// 引入路由鉴权
import './permission'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(allGloablComponent)
// 注册模板路由
app.use(router)
// 注册仓库
app.use(pinia)
app.mount('#app')
