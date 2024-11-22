import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { CODE_STATUS } from "./codeStatus";

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
        const toekn = localStorage.getItem("token");
        if (toekn) {
            config.headers.Authorization = "Bearer " + toekn;
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

export default server;