import { noticeServer } from "./server";
import type { NoticePageQuery } from "./type";

/**
 * 获取我的通知公告分页列表
 * @returns 
 */
async function getMyNoticePage(queryParams?: NoticePageQuery) {
    try {
        const res = await noticeServer.getMyNoticePage(queryParams);
        return {
            data: res.data
        }
    } catch (error) {
        return {}
    }
}


/* 通知公告 api */
export const noticeApi = {
    getMyNoticePage
}