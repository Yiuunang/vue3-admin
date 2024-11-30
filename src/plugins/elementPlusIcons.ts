import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue';

/**
 * 注册所有 Element Plus 图标组件
 * @param app 
 */
export function setupElIcons(app: App) {
    const allIcons = Object.entries(ElementPlusIconsVue)
    for (const [key, component] of allIcons) {
        app.component(key, component);
    }
}