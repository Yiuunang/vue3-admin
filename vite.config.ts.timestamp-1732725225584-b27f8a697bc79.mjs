// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig, loadEnv } from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@22.9.1__vue@3.5.13_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.0_vite@5.4.11_@types+node@22.9.1__vue@3.5.13_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/vite-plugin-vue-devtools@7.6.4_rollup@4.27.3_vite@5.4.11_@types+node@22.9.1__vue@3.5.13_typescript@5.6.3_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/unplugin-auto-import@0.18.5_@vueuse+core@9.13.0_vue@3.5.13_typescript@5.6.3___rollup@4.27.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.27.3_vue@3.5.13_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/unplugin-icons@0.20.1_@vue+compiler-sfc@3.5.13/node_modules/unplugin-icons/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.27.3_vue@3.5.13_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///D:/code/project/vue3-admin/node_modules/.pnpm/unplugin-icons@0.20.1_@vue+compiler-sfc@3.5.13/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "D:\\code\\project\\vue3-admin";
var __vite_injected_original_import_meta_url = "file:///D:/code/project/vue3-admin/vite.config.ts";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // 自动导入
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "pinia"],
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon"
          })
        ],
        eslintrc: {
          enabled: true,
          // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json"
          // 指定自动导入函数 eslint 规则的文件
        },
        vueTemplate: true,
        // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts")
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts")
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true,
      // 自动打开浏览器
      // 反向代理解决跨域
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://vapi.youlai.tech",
          // target: 'http://127.0.0.1:8989',
          changeOrigin: true,
          rewrite: (path2) => {
            const proxyPath = path2.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), "");
            return proxyPath;
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHByb2plY3RcXFxcdnVlMy1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFxwcm9qZWN0XFxcXHZ1ZTMtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvcHJvamVjdC92dWUzLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5pbXBvcnQgeyBDb25maWdFbnYsIGRlZmluZUNvbmZpZywgbG9hZEVudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcblxyXG4vLyBcdTYzMDlcdTk3MDBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVBUElcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuLy8gXHU2MzA5XHU5NzAwXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbi8vIFx1NjMwOVx1OTcwMFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBpY29uXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xyXG4vLyBFbGVtZW50clBsdXNcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcblxyXG5cclxuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgdnVlSnN4KCksXHJcbiAgICAgIHZ1ZURldlRvb2xzKCksXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcclxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICdwaW5pYSddLFxyXG5cclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQUVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uIChcdTVFMjZcdTY4MzdcdTVGMEYpXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6ICdJY29uJyxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgZXNsaW50IFx1ODlDNFx1NTIxOVx1RkYwQ1x1NUVGQVx1OEJBRVx1NzUxRlx1NjIxMFx1NEU0Qlx1NTQwRVx1OEJCRVx1N0Y2RSBmYWxzZSBcclxuICAgICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIiwgLy8gXHU2MzA3XHU1QjlBXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1MUZEXHU2NTcwIGVzbGludCBcdTg5QzRcdTUyMTlcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1NzI4IHZ1ZSBcdTZBMjFcdTY3N0ZcdTRFMkRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcclxuICAgICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCBcInR5cGVzXCIsICdhdXRvLWltcG9ydHMuZC50cycpLFxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcclxuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgXCJ0eXBlc1wiLCAnY29tcG9uZW50cy5kLnRzJyksXHJcbiAgICAgIH0pLFxyXG4gICAgICBJY29ucyh7XHJcbiAgICAgICAgYXV0b0luc3RhbGw6IHRydWUsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9BUFBfUE9SVCksXHJcbiAgICAgIG9wZW46IHRydWUsIC8vIFx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxyXG4gICAgICAvLyBcdTUzQ0RcdTU0MTFcdTRFRTNcdTc0MDZcdTg5RTNcdTUxQjNcdThERThcdTU3REZcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL3ZhcGkueW91bGFpLnRlY2gnLFxyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTo4OTg5JyxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3h5UGF0aCA9IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtlbnYuVklURV9BUFBfQkFTRV9BUEl9YCksICcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5UGF0aDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1EsU0FBUyxlQUFlLFdBQVc7QUFDM1MsT0FBTyxVQUFVO0FBRWpCLFNBQW9CLGNBQWMsZUFBMkI7QUFDN0QsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUd4QixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLFdBQVc7QUFFbEIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxtQkFBbUI7QUFoQjFCLElBQU0sbUNBQW1DO0FBQTBILElBQU0sMkNBQTJDO0FBbUJwTixJQUFNLFVBQVUsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFHN0MsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQTZCO0FBQy9ELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBO0FBQUEsTUFFWixXQUFXO0FBQUE7QUFBQSxRQUdULFNBQVMsQ0FBQyxPQUFPLE9BQU87QUFBQTtBQUFBLFFBR3hCLFdBQVc7QUFBQSxVQUNULG9CQUFvQjtBQUFBO0FBQUEsVUFFcEIsY0FBYztBQUFBLFlBQ1osUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUVBLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsUUFDWjtBQUFBLFFBRUEsYUFBYTtBQUFBO0FBQUEsUUFDYixLQUFLLEtBQUssUUFBUSxTQUFTLFNBQVMsbUJBQW1CO0FBQUEsTUFDekQsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVztBQUFBO0FBQUEsVUFFVCxjQUFjO0FBQUEsWUFDWixvQkFBb0IsQ0FBQyxJQUFJO0FBQUEsVUFDM0IsQ0FBQztBQUFBO0FBQUEsVUFFRCxvQkFBb0I7QUFBQSxRQUN0QjtBQUFBLFFBQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxTQUFTLGlCQUFpQjtBQUFBLE1BQ3ZELENBQUM7QUFBQSxNQUNELE1BQU07QUFBQSxRQUNKLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFPLElBQUksYUFBYTtBQUFBLE1BQzlCLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFFTixPQUFPO0FBQUEsUUFDTCxDQUFDLElBQUksaUJBQWlCLEdBQUc7QUFBQSxVQUN2QixRQUFRO0FBQUE7QUFBQSxVQUVSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBUztBQUNqQixrQkFBTSxZQUFZQSxNQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksSUFBSSxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7QUFDMUUsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
