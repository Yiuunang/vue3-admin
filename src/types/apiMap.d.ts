// import { type } from './auto-imports';
declare module 'ApiMap' {
    type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
    type ApiMap = Record<string, [ApiMethod, string]>;


    // 登录
    interface LoginParams {
        username: string;
        password: string;
    }
    interface LoginResult {
        // 访问token
        accessToken?: string;
        // 过期时间(单位：毫秒)
        expires?: number;
        // 刷新token
        refreshToken?: string;
        // token 类型
        tokenType?: string;
    }
}