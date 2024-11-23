
// 登录
export interface LoginParams {
    username: string;
    password: string;
    captchaKey: string;
    captchaCode: string;
}
/**
 * 登录响应结果
 */
export interface LoginResult {
    // 访问token
    accessToken: string;
    // 过期时间(单位：毫秒)
    expires: number;
    // 刷新token
    refreshToken: string;
    // token 类型
    tokenType: string;
}

/**
* 验证码响应对象
*/
export interface CaptchaResult {
    // 验证码图片Base64字符串
    captchaBase64: string;
    // 验证码ID
    captchaKey: string;
}
