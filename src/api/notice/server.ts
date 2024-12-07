import request from "@/utils/request";
import { noticeApiMap } from "../apiMap";
import type { DataUserNoticePageVO, NoticePageQuery } from "./type";

/**
 * 获取我的通知公告分页列表
 * @returns 
 */
function getMyNoticePage(queryParams?: NoticePageQuery) {
    const [method, url] = noticeApiMap.myNoticePage;
    return request[method]<DataUserNoticePageVO>(url, {
        params: queryParams
    })
}

export const noticeServer = {
    getMyNoticePage
}