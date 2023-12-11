/*
 * @Description: 对外暴露全局组件
 * @Author: 振顺
 * @Date: 2023-11-14 11:04:28
 * @LastEditTime: 2023-11-14 11:05:37
 * @LastEditors: 振顺
 */
import Pagination from './Pagination/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allGloablComponent = { Pagination }
export default {
  install(app) {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
