import axios, { type AxiosRequestConfig } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { CODE_STATUS } from "./codeStatus";
import type { ApiMethod } from "ApiMap";
import { getToken } from "./auth";

// 创建 axios 实例
const server = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
    headers: {
        "Content-Type": "apllication/json;charset=utf-8"
    }
})

// 请求拦截器
server.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)

// 响应拦截器
server.interceptors.response.use(
    (response) => {
        const { code, msg } = response.data;
        // 登录成功
        if (code === CODE_STATUS.SUCCESS) {
            return response.data;
        }

        ElMessage.error(msg || '请求失败');
        return Promise.reject(new Error(msg || 'Error'));
    },
    (error) => {
        if (error.response.data) {
            const { code, msg } = error.response.data;
            // token 过期，跳转登录页
            if (code === CODE_STATUS.EXPIRED) {
                ElMessageBox.confirm(
                    '当前页面已失效，请重新登录',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }
                ).then(() => {
                    localStorage.clear();
                    window.location.href = '/';
                });
            } else {
                ElMessage.error(msg || '系统出错');
            }
        }

        return Promise.reject(error);
    }
)

// 请求方法封装
const request = {
    GET: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return server.get<T>(url, config)
    },
    POST: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<any> | undefined) => {
        return server.post<T>(url, data, config)
    },
    PUT: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<any> | undefined) => {
        return server.put<T>(url, data, config);
    },
    DELETE: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return server.delete<T>(url, config)
    },
}

export default request;