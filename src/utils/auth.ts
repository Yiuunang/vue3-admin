const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * 设置 token
 * @param token 
 */
export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 获取 token
 * @returns 
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
}

/**
 * 获取 刷新token
 * @returns 
 */
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || "";
}

/**
 * 保存 刷新token
 * @param refreshToken 
 */
export function setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}


/**
 * 清除 token
 */
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}