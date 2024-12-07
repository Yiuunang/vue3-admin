import { logServer } from "./server";
import type { VisitTrendQuery } from "./type";

/**
 * 获取访问数据
 * @returns 
 */
async function getVisitStats() {
    try {
        const res = await logServer.getVisitStats();
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}

/**
 * 获取访问数据
 * @returns 
 */
async function getVisitTrend(params: VisitTrendQuery) {
    try {
        const res = await logServer.getVisitTrend(params);
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}


export const logApi = {
    getVisitStats,
    getVisitTrend
}