import { authApi } from "@/api/auth/api";
import type { LoginParams, UserInfo } from "@/api/auth/type";
import { useStorage } from "@/hooks/useStorage";
import { resetRouter } from "@/router";
import { clearToken, getRefreshToken, setRefreshToken, setToken } from "@/utils/auth";
import { store } from ".";

export const useUserStore = defineStore('user', () => {
    // 用户信息
    const userInfo = useStorage<UserInfo>('userInfo', {} as UserInfo);

    // 登录
    function login(params: LoginParams) {
        return new Promise(async (resolve, reject) => {
            const { data } = await authApi.login(params)
            if (data) {
                const { tokenType, accessToken, refreshToken } = data
                setToken(tokenType + ' ' + accessToken)
                setRefreshToken(refreshToken)
                resolve(data)
            } else {
                reject(data)
            }
        })
    }

    // 获取用户信息
    function getUserInfo() {
        return new Promise(async (resolve, reject) => {
            const { data } = await authApi.getUserInfo()
            if (data && userInfo.value) {
                Object.assign(userInfo.value, data);
                resolve(data);
            } else {
                reject(data)
            }
        })
    }

    /**
     * 登出
     */
    function loginOut() {
        return new Promise(async (resolve, reject) => {
            await authApi.loginOut()
            clearUserInfo();
        })
    }


    /**
     * 刷新 token
     */
    function refreshToken() {
        const refreshToken = getRefreshToken();
        return new Promise(async (resolve, reject) => {
            const { data } = await authApi.refreshToken(refreshToken)
            if (data) {
                const { tokenType, accessToken, refreshToken } = data
                setToken(tokenType + ' ' + accessToken)
                setRefreshToken(refreshToken)
                resolve(data)
            } else {
                console.log(" refreshToken  刷新失败");
                reject(data)
            }
        })
    }

    /**
     * 清除用户信息
     */
    function clearUserInfo() {
        userInfo.value = null;
        clearToken();
        // todo 重置路由 动态路由?
        resetRouter();
    }

    return {
        userInfo,
        login,
        refreshToken,
        getUserInfo,
        loginOut,
        clearUserInfo,
    }
})


/**
 * 在组件外使用 userStore
 * @returns 
 */
export const useUserStoreWithOut = () => useUserStore(store)


