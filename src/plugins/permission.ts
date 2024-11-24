import router from "@/router";
import NProgress from 'nprogress'
import { getToken } from "@/utils/auth";
import type { NavigationGuardNext, RouteLocationNormalizedGeneric } from "vue-router";


export function setupPermission() {
    // 白名单路由
    const whiteList = ["/login"];

    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 是否登录
        const isLogin = !!getToken();
        if (isLogin) {
            if (to.path === "/login") {
                next({ path: "/" });
            } else {
                if (to.matched.length === 0) {
                    // 路由未匹配，跳转到404
                    next("/404");
                } else {
                    // 动态设置页面标题
                    const title = (to.params.title as string) || (to.query.title as string);
                    if (title) {
                        to.meta.title = title;
                    }
                    next();
                }
            }
        } else {
            if (whiteList.includes(to.path)) {
                next();
            } else {
                // 重定向到登录页
                next({
                    name: 'Login',
                    query: {
                        redirect: to.fullPath,  // 将要跳转的路由地址作为参数
                    },
                    replace: true,
                });
                next();
            }
        }

    })

    router.afterEach(() => {
        // 结束进度条显示
        NProgress.done()
    })
}