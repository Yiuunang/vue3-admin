import router from "@/router";
import NProgress from 'nprogress'
import { getToken } from "@/utils/auth";
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedGeneric } from "vue-router";
import { usePermissionStore } from "@/stores/modules/permission";
import { useUserStore } from "@/stores/modules/user";


export function setupPermission() {
    // 白名单路由
    const whiteList = ["/login"];

    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        // 是否登录
        const isLogin = !!getToken();
        if (isLogin) {
            if (to.path === "/login") { // 已登录，跳转到首页
                next({ path: "/" });
            } else {
                const permissionStore = usePermissionStore();

                // 判断动态路由是否加载
                if (permissionStore.isGetDynamicRouter) {
                    if (to.matched.length === 0) {  // 路由未匹配，跳转到404
                        next("/404");
                    } else {
                        const title = (to.params.title as string) || (to.query.title as string);
                        if (title) {
                            to.meta.title = title;
                        }
                        next();
                    }
                } else {
                    try {
                        // 生成动态路由
                        const dynamicRoutes = await permissionStore.generateRoutes()

                        // 添加路由
                        dynamicRoutes.forEach(r => router.addRoute(r));

                        next({ ...to, replace: true });
                    } catch (error) {   // 路由加载失败，清空信息，跳转到登录页
                        console.error("生成动态路由失败", error);
                        const userStore = useUserStore();
                        userStore.clearUserInfo();
                        // 重定向到登录页
                        redirectToLogin(to, next);
                        NProgress.done();
                    }
                }

            }
        } else {
            if (whiteList.includes(to.path)) {  // 白名单路由直接放行
                next();
            } else {    // 重定向到登录页
                redirectToLogin(to, next);
                NProgress.done();
            }
        }

    })

    router.afterEach(() => {
        // 结束进度条显示
        NProgress.done()
    })
}


function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
    next({
        name: 'Login',
        query: {
            redirect: to.fullPath,  // 将要跳转的路由地址作为参数
        },
        replace: true,
    });
}