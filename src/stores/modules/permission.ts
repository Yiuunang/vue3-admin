import { menuApi } from "@/api/menu/api";
import type { RouteVO } from "@/api/menu/type";
import router, { staticRoutes } from "@/router";
import type { RouteRecordRaw } from "vue-router";

export const usePermissionStore = defineStore('permission', () => {

    // 所有路由(静态+动态)
    const allRouter = ref<RouteRecordRaw[]>([]);
    // 是否已获取路由
    const isGetDynamicRouter = ref(false);

    /**
     * 生成动态路由
     * @returns 
     */
    function generateRoutes() {
        return new Promise<RouteRecordRaw[]>(async (resolve, reject) => {
            const { data } = await menuApi.getRoutesList();
            if (data) {
                const dynamicRoutes = transformRoutes(data);
                allRouter.value = staticRoutes.concat(dynamicRoutes);
                isGetDynamicRouter.value = true;
                resolve(dynamicRoutes)
            } else {
                reject(data)
            }
        })
    }

    /**
     * 重置路由
     */
    function resetRoute() {
        // 删除动态路由，保留静态路由
        allRouter.value.forEach(item => {
            const itemName = item.name
            const isStatic = staticRoutes.find(r => r.name === itemName)
            if (itemName && !isStatic) {
                router.removeRoute(itemName)
            }
        })
        allRouter.value = [];
        isGetDynamicRouter.value = false;

    }

    return {
        allRouter,
        isGetDynamicRouter,
        generateRoutes,
        resetRoute
    }

})


const Layout = () => import("@/layout/index.vue"); // 布局
// import.meta.glob 是一个 Vite 提供的特殊功能，用于批量导入模块。它允许你动态地导入多个文件
const modules = import.meta.glob("../../views/**/**.vue");
const transformRoutes = (routeList: RouteVO[]) => {
    const dynamicRoutes: RouteRecordRaw[] = []; // 动态路由

    routeList.forEach(item => {
        const tmpRoute: RouteRecordRaw = { ...item } as any;

        if (tmpRoute.component?.toString() === 'Layout') {  // 顶级目录 → 替换为组件
            tmpRoute.component = Layout;
        } else {    // 其他菜单 → 根据组件路径动态加载组件
            const component = modules[`../../views/${tmpRoute.component}.vue`]
            if (component) {
                tmpRoute.component = component;
            } else {
                tmpRoute.component = modules["../../views/error-page/404.vue"];
            }

        }

        if (tmpRoute.children) {
            tmpRoute.children = transformRoutes(item.children);
        }

        dynamicRoutes.push(tmpRoute);
    })

    return dynamicRoutes;
}