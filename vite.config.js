/*
 * @Description:
 * @Author: 振顺
 * @Date: 2023-12-11 11:23:36
 * @LastEditTime: 2023-12-11 14:47:54
 * @LastEditors: 振顺
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 输出目录
    outDir: 'QDDP',
    // 是否生成源代码映射文件
    sourcemap: true,
    // 分解每个模块
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
  base: './',
  plugins: [vue()],
  server: {
    proxy: {
      '/crmapi': {
        // 获取数据的服务器地址设置
        target: 'http://dev.jettwork.com:8790',
        // 是否代理跨域
        changeOrigin: true,
        ws: true, // 支持 websocket
        // 路径重写
        // rewrite: (path) => path.replace(/^\/crmapi/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // scss全局变量配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
})
