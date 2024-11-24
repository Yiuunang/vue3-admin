import { authServer } from "./server";
import type { LoginParams } from "./type";

/**
 * api 层
 */

/**
 * 登录
 * @param params 
 * @returns 
 */
async function login(params: LoginParams) {
    try {
        const res = await authServer.login(params);
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

/**
 * 刷新 token
 * @param refreshToken 
 * @returns 
 */
async function refreshToken(refreshToken: string) {
    try {
        const res = await authServer.refreshToken(refreshToken);
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }

}

/**
 * 获取验证码
 * @returns 
 */
async function getCapacha() {
    try {
        const res = await authServer.getCapacha();
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

/**
 * 获取用户信息
 * @returns 
 */
async function getUserInfo() {
    try {
        const res = await authServer.getUserInfo();
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

/**
 * 登出
 * @returns 
 */
async function loginOut() {
    try {
        const res = await authServer.loginOut();
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

export const authApi = {
    login,
    refreshToken,
    getCapacha,
    getUserInfo,
    loginOut
}