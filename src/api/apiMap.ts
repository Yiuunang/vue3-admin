/**
 * 接口 apiMap
 * 封装了 method 和 url 的形式，避免了 url 的硬编码
 * 
 * server 层封装请求
 * api 层调用 server 层
 * view 层调用 api 层
 * 减少代码耦合度，利于扩展和维护
 */

// import type 是 TypeScript 中的一种特定导入语法，用于引入仅在类型检查和编译时需要的类型信息，而不会引入实际运行时的代码。
import type { ApiMap } from 'ApiMap';

/**
 * 权限相关接口
 */
export const authApiMap: ApiMap = {
    // 登录
    login: ['POST', '/api/v1/auth/login'],
    // 获取验证码
    captcha: ['GET', '/api/v1/auth/captcha'],
};