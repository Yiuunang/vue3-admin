/**
 * server 层
 */
import type { LoginParams, LoginResult } from 'ApiMap'
import { authApiMap } from '../apiMap'
import request from '@/utils/request';
import qs from 'qs';

/**
 * 登录
 */
export async function login(params: LoginParams) {
    const [method, url] = authApiMap.login;
    return request[(method as 'POST')]<LoginResult>(url, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}