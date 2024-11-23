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
        console.log(1, res);

        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

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

export const authApi = {
    login,
    getCapacha
}