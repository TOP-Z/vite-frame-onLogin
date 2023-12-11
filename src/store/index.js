/*
 * @Description: pinia大仓库
 * @Author: 振顺
 * @Date: 2023-11-14 09:37:07
 * @LastEditTime: 2023-11-14 09:37:19
 * @LastEditors: 振顺
 */
// 仓库大仓库
import { createPinia } from 'pinia'
// 创建大仓库
let pinia = createPinia()
// 对外暴露：入口文件需要安装仓库
export default pinia
