import request from "@/utils/request";
import { menuApiMap } from "../apiMap";
import type { RouteVO } from "./type";

/**
 * 获取路由列表
 * @returns 
 */
function getRoutesList() {
    const [method, url] = menuApiMap.routesList;
    return request[method]<RouteVO[]>(url)
}

export const menuServer = {
    getRoutesList
}