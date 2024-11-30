/**
 * 判断是否是外部链接
 * @param url 
 * @returns 
 */
export function isExternalLink(url: string) {
    const rule = /^(https?:|mailto:|tel:)/
    const isExternal = rule.test(url);
    return isExternal
}