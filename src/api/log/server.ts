import request from "@/utils/request";
import { logApiMap } from "../apiMap";
import type { VisitStatsVO, VisitTrendQuery, VisitTrendVO } from "./type";

/**
 * 获取访问数据
 * @returns 
 */
function getVisitStats() {
    const [method, url] = logApiMap.visitStats;
    return request[method]<VisitStatsVO[]>(url)
}

/**
 * 获取访问数据
 * @returns 
 */
function getVisitTrend(params: VisitTrendQuery) {
    const [method, url] = logApiMap.visitTrend;
    return request[method]<VisitTrendVO>(url, { params })
}

export const logServer = {
    getVisitStats,
    getVisitTrend
}