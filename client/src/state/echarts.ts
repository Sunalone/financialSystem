import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, ScatterChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

const initChart = (chartId: string, options: Record<string, unknown>) => {
    if (!chartId) {
        return;
    }
    const chart = echarts.init(
        document.getElementById(chartId) ?? document.body,
    );
    chart.setOption(options);
};

export default initChart;
