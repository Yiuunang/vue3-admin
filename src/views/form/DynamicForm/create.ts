import type { FormItem } from "./type";

export const createFormItem = (params: {
    type: FormItem['type'],
    payload: FormItem['payload'],
    next?: FormItem['next'],
    parent?: FormItem['parent']
}): FormItem => {
    const { type, payload, parent = null, next = () => null } = params;


    const nextFunc: FormItem['next'] = (current) => {
        let nextItem = next(current);
        if (!nextItem) {
            nextItem = null;
        }

        if (nextItem) {
            nextItem.parent = current;
            if (!isReactive(nextItem)) {
                nextItem = reactive(nextItem);
            }
        }

        return nextItem;
    }

    // 该函数返回的表单项通过 Vue 的 reactive 方法将其转为响应式对象，以确保后续的表单变更可以实时更新页面。
    const formItem: FormItem = reactive({
        type,
        payload,
        next: nextFunc,
        parent,
    });


    return formItem;
}