
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
    expiresIn: number;
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

/**
 * 登录用户信息
 */
export interface UserInfo {
    // 头像地址
    avatar: string;
    // 用户昵称
    nickname: string;
    // 用户权限标识集合
    perms: string[];
    // 用户角色编码集合
    roles: string[];
    // 用户ID
    userId: number;
    // 用户名
    username: string;
}