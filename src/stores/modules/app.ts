import { AsideStatusEnum } from "@/enums/AsideStatusEnum"
import { toggoleThemeMode } from "@/utils/theme";
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore('app', () => {

    // 侧边栏状态
    const asideStatus = useStorage('asideStatus', AsideStatusEnum.OPEN);
    // 侧边栏是否折叠
    const asideIsCollapse = computed(() => asideStatus.value === AsideStatusEnum.CLOSE ? true : false)

    // 检查用户的首选颜色模式是否为暗黑模式
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initThemeType = darkModeQuery.matches ? 'dark' : 'light';
    // 主题类型
    const themeType = useStorage<'dark' | 'light'>('themeType', initThemeType);
    // 是否暗黑模式
    const isDark = computed(() => themeType.value === 'dark' ? true : false);

    watch(themeType, (newType) => {
        toggoleThemeMode(newType === 'dark');
    }, { immediate: true })

    // 切换主题
    function toggleThemeType() {
        themeType.value = themeType.value === 'dark' ? 'light' : 'dark';
    }

    function toggleAsideStatus() {
        asideStatus.value = asideStatus.value === AsideStatusEnum.OPEN ? AsideStatusEnum.CLOSE : AsideStatusEnum.OPEN;
    }

    return {
        asideStatus,
        asideIsCollapse,
        toggleAsideStatus,
        isDark,
        toggleThemeType
    }
})