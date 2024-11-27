import { menuServer } from "./server";

/**
 * 获取路由列表
 * @returns 
 */
async function getRoutesList() {
    try {
        const res = await menuServer.getRoutesList();
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}


export const menuApi = {
    getRoutesList
}