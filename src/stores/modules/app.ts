import { AsideStatusEnum } from "@/enums/AsideStatusEnum"
import { useStorage } from "@/hooks/useStorage"

export const useAppStore = defineStore('app', () => {

    // 侧边栏状态
    const asideStatus = useStorage('asideStatus', AsideStatusEnum.OPEN);

    function toggleAsideStatus() {
        asideStatus.value = asideStatus.value === AsideStatusEnum.OPEN ? AsideStatusEnum.CLOSE : AsideStatusEnum.OPEN;
    }

    return {
        asideStatus,
        toggleAsideStatus
    }
})