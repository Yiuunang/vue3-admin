/**
 * 设置 token
 * @param token 
 */
export function setToken(token: string) {
    localStorage.setItem('token', token);
}

/**
 * 获取 token
 * @returns 
 */
export function getToken() {
    return localStorage.getItem('token') || "";
}

/**
 * 保存刷新 token
 * @param refreshToken 
 */
export function setRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
}