/**
 * server 层
 */
import { authApiMap } from '../apiMap'
import request from '@/utils/request';
import qs from 'qs';
import type { LoginParams, LoginResult, CaptchaResult } from './type';

/**
 * 登录
 */
async function login(params: LoginParams) {
    const [method, url] = authApiMap.login;
    return request[(method as 'POST')]<LoginResult>(url, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

async function getCapacha() {
    const [method, url] = authApiMap.captcha;
    return request[method]<CaptchaResult>(url);
}

export const authServer = {
    login,
    getCapacha
}