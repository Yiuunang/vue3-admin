import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "./auth";
import { ResponseCode } from "@/enums/ResponseCode";
import { useUserStoreWithOut } from "@/stores/user";
import router from "@/router";

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

        if (config.headers.Authorization !== 'no-auth' && token) {
            config.headers.Authorization = token;
        } else {
            delete config.headers.Authorization;
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
        const { code, msg, data } = response.data;
        // 登录成功
        if (code === ResponseCode.SUCCESS) {
            return response.data;
        }

        ElMessage.error(msg || '请求失败');
        return Promise.reject(new Error(msg || 'Error'));
    },
    (error) => {
        const { config, response } = error;

        if (response) {
            const { code, msg } = response.data;
            switch (code) {
                case ResponseCode.ACCESS_TOKEN_INVALID:
                    handleRefreshToken(config);
                    break;
                case ResponseCode.REFRESH_TOKEN_INVALID:
                    return Promise.reject(new Error(msg || "Error"));
                default:
                    ElMessage.error(msg || "系统出错");
                    break;
            }
        }

        return Promise.reject(error);
    }
)


let isRefreshing = false;
// 因 Token 过期导致失败的请求队列
let requestsQueue: (() => void)[] = [];

/**
 * 处理 refresh token
 */
function handleRefreshToken(config: InternalAxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
        const requestCallback = () => {
            const token = getToken();
            config.headers.Authorization = token;
            resolve(server(config))
        }

        requestsQueue.push(requestCallback);

        if (!isRefreshing) {
            isRefreshing = true;

            const userStore = useUserStoreWithOut()

            try {
                await userStore.refreshToken()
                // 刷新 token 成功后，重新发起失败的请求
                requestsQueue.forEach((callback) => callback())
            } catch (error) {
                // Token 刷新失败，清除用户数据并跳转到登录
                ElNotification({
                    title: "提示",
                    message: "您的会话已过期，请重新登录",
                    type: "info",
                });
                userStore.clearUserInfo();
                router.push({ name: "Login" });

                // 拒绝队列中的请求
                requestsQueue.forEach(() => reject(error));
            } finally {
                requestsQueue = [];
                isRefreshing = false;
            }

        }

    })
}


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