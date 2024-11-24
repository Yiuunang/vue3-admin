/**
 * server 层
 */
import { authApiMap } from '../apiMap'
import request from '@/utils/request';
import qs from 'qs';
import type { LoginParams, LoginResult, CaptchaResult, UserInfo } from './type';

/**
 * 登录
 */
function login(params: LoginParams) {
    const [method, url] = authApiMap.login;
    return request[(method as 'POST')]<LoginResult>(url, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

/**
 * 刷新 token
 * @returns 
 */
function refreshToken(refreshToken: string) {
    const [method, url] = authApiMap.refreshToken;
    return request[(method as 'POST')]<LoginResult>(
        url,
        { refreshToken: refreshToken },
        {
            headers: {
                Authorization: "no-auth",
                'Content-Type': 'application/json',
            },
        });
}

/**
 * 获取验证码
 * @returns 
 */
function getCapacha() {
    const [method, url] = authApiMap.captcha;
    return request[method]<CaptchaResult>(url);
}

/**
 * 获取用户信息
 * @returns 
 */
function getUserInfo() {
    const [method, url] = authApiMap.getUserInfo;
    return request[method]<UserInfo>(url);
}

/**
 * 登出
 * @returns 
 */
function loginOut() {
    const [method, url] = authApiMap.loginOut;
    return request[method](url);
}

export const authServer = {
    login,
    refreshToken,
    getCapacha,
    getUserInfo,
    loginOut
}