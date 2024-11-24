export const enum ResponseCode {
    /** 成功 */
    SUCCESS = "00000",
    /** 错误 */
    ERROR = "B0001",
    /** 访问 token 无效或过期 */
    ACCESS_TOKEN_INVALID = "A0230",
    /** 刷新令牌无效或过期 */
    REFRESH_TOKEN_INVALID = "A0231",
}