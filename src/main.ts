import { createApp } from 'vue'
import App from './App.vue'

import setupPlugins from '@/plugins'

// 样式
import 'element-plus/theme-chalk/el-message.css';
// 黑色主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/styles/index.css'

const app = createApp(App)

app.use(setupPlugins);

app.mount('#app')
