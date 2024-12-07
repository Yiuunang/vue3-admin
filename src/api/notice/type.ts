
/**
 * DataUserNoticePageVO
 */
export interface DataUserNoticePageVO {
    list: UserNoticePageVO[];
    total: number;
}

/**
 * UserNoticePageVO，用户公告VO
 */
export interface UserNoticePageVO {
    /**
     * 通知ID
     */
    id: number;
    /**
     * 是否已读
     */
    isRead: number;
    /**
     * 通知等级
     */
    level: string;
    /**
     * 发布人姓名
     */
    publisherName: string;
    /**
     * 发布时间
     */
    publishTime: Date;
    /**
     * 通知标题
     */
    title: string;
    /**
     * 通知类型
     */
    type: number;
}


/**
 * 分页查询参数
 */
interface PageQuery {
    pageNum: number;
    pageSize: number;
}

/** 通知公告分页查询参数 */
export interface NoticePageQuery extends PageQuery {
    /** 标题 */
    title?: string;
    /** 发布状态(0：未发布，1：已发布，-1：已撤回) */
    publishStatus?: number;
    isRead?: number;
}