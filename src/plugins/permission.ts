import router from "@/router";
import NProgress from 'nprogress'
import { getToken } from "@/utils/auth";


export function setupPermission() {
    // 白名单路由
    const whiteList = ["/login"];

    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 是否登录
        const isLogin = !!getToken();
        if (isLogin) {
            // 已登录，访问登录页，跳转到首页
            next({ path: "/" });
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
            }
        }

    })

    router.afterEach(() => {
        // 结束进度条显示
        NProgress.done()
    })
}