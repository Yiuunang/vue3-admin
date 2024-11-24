type RefValue<T> = {
    value: T;
};

/**
 * 本地存储(响应式)
 * @param key 
 * @param initialValue 
 * @param type 
 * @returns 
 */
export function useStorage<T>(key: string, initialValue: T, type: 'localStorage' | 'sessionStorage' = 'localStorage') {
    const storage = type === 'localStorage' ? localStorage : sessionStorage;

    const storageValue = storage.getItem(key);
    const value: Ref<T | null> = ref(storageValue ? JSON.parse(storageValue) : initialValue);

    watch(
        value,
        (newValue) => {
            if (newValue === undefined || newValue === null) {
                storage.removeItem(key);
            } else {
                storage.setItem(key, JSON.stringify(newValue));
            }
        },
        {
            deep: true
        }
    )

    return value;
}