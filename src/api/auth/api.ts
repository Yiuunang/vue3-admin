import type { LoginParams } from "ApiMap";
import * as authServer from "./server";

/**
 * api 层
 */
async function login(params: LoginParams) {
    try {
        const res = await authServer.login(params);
        return {
            data: res.data
        }
    } catch (error) {
        console.log("登录失败：", error)
        return {
            data: {},
        }
    }
}

export const authApi = {
    login
}