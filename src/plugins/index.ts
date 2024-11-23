import type { App } from "vue";
import { setupPermission } from "./permission";
import { setupRouter } from "@/router";
import { setupStore } from "@/stores";

export default {
    install(app: App<Element>) {
        // 路由
        setupRouter(app);
        // 仓库
        setupStore(app);
        // 路由守卫
        setupPermission();
    }
}