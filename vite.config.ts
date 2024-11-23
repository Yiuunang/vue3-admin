import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 按需自动导入API
import AutoImport from 'unplugin-auto-import/vite'
// 按需自动导入组件
import Components from 'unplugin-vue-components/vite'
// 按需自动导入 icon
import Icons from 'unplugin-icons/vite'
// ElementrPlus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'


const pathSrc = path.resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // 自动导入
      AutoImport({

        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'pinia'],

        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },

        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, "types", 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      // host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 自动打开浏览器
      // 反向代理解决跨域
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'http://vapi.youlai.tech',
          target: 'http://127.0.0.1:8989',
          changeOrigin: true,
          rewrite: (path) => {
            // const proxyPath = path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '/api');
            return path;
          }
        }
      }
    }
  }
})
