// 可选表单类型
export type FormItemType = 'input' | 'select' | 'checkbox' | 'radio';

// 表单项的数据结构
export type FormItem = {
    type: FormItemType; // 表单类型
    payload: any;       // 表单数据(包括标签，默认值，选项等)
    next: (current: FormItem) => FormItem | null; // 渲染下一个表单项的逻辑
    parent: FormItem | null; // 父级表单项
}



