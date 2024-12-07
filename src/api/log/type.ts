/**
 * VisitStatsVO，访问量统计VO
 */
export interface VisitStatsVO {
    /**
     * 统计粒度标签
     */
    granularityLabel: string;
    /**
     * 增长率
     */
    growthRate: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 今日访问量
     */
    todayCount: number;
    /**
     * 总访问量
     */
    totalCount: number;
    /**
     * 统计类型
     */
    type: string;
}


/** 访问趋势查询参数 */
export interface VisitTrendQuery {
    /** 开始日期 */
    startDate: string;
    /** 结束日期 */
    endDate: string;
}
/**
 * VisitTrendVO，访问趋势VO
 */
export interface VisitTrendVO {
    /**
     * 日期列表
     */
    dates: string[];
    /**
     * IP数
     */
    ipList: number[];
    /**
     * 浏览量(PV)
     */
    pvList: number[];
    /**
     * 访客数(UV)
     */
    uvList: number[];
}