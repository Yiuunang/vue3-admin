import echarts, { type ECOption } from "@/utils/eCharts";

/**
 * echarts resize
 */
const userChartResize = (id: string) => {

    let chart: echarts.ECharts | null = null;

    const initChart = () => {
        const mountDom = document.getElementById(id);
        if (mountDom && !chart) {
            chart = echarts.init(mountDom);
        }

        return chart;
    }

    const setChartOption = (option: ECOption) => {
        chart?.setOption(option);
    }

    const resizeHandle = () => {
        chart?.resize();
    }

    onMounted(() => {
        window.addEventListener('resize', resizeHandle)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', resizeHandle)
        chart?.dispose()
    })

    return {
        initChart,
        setChartOption
    }
}

export default userChartResize;