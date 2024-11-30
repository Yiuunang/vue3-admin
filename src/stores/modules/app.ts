import { AsideStatusEnum } from "@/enums/AsideStatusEnum"
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore('app', () => {

    // 侧边栏状态
    const asideStatus = useStorage('asideStatus', AsideStatusEnum.OPEN);
    // 侧边栏是否折叠
    const asideIsCollapse = computed(() => asideStatus.value === AsideStatusEnum.CLOSE ? true : false)

    function toggleAsideStatus() {
        asideStatus.value = asideStatus.value === AsideStatusEnum.OPEN ? AsideStatusEnum.CLOSE : AsideStatusEnum.OPEN;
    }

    return {
        asideStatus,
        asideIsCollapse,
        toggleAsideStatus
    }
})