import { useEffect } from "react";
import DashboardBox from "@/components/DashboardBox";
import { Box, useTheme } from "@mui/material";
import initChart from "@/state/echarts";
import BoxHeader from "@/components/BoxHeader";
import { useCommonContext } from "@/context/commonContext";

const OVER_VIEW = "Overview";

const Overview = () => {
    const { palette } = useTheme();

    const { revenueData, expensesData, xAxisMonthData } = useCommonContext();

    const initOverviewChart = () => {
        initChart(OVER_VIEW, {
            tooltip: {
                trigger: "item",
            },
            xAxis: {
                type: "category",
                data: xAxisMonthData,
                boundaryGap: true,
                axisLabel: {
                    interval: 0,
                },
                axisTick: {
                    show: false,
                },
            },
            grid: {
                left: "0.5%",
                right: "2%",
                bottom: "3%",
                containLabel: true,
            },
            yAxis: [
                {
                    type: "value",
                    splitLine: { show: false },
                },
            ],
            series: [
                {
                    name: "revenue",
                    type: "bar",
                    data: revenueData,
                    stack: "total",
                    barWidth: "15px",
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: palette.primary[500],
                                    // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: palette.primary[700],
                                    // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                },
                {
                    name: "revenue",
                    type: "bar",
                    stack: "total",
                    data: expensesData,
                    barWidth: "15px",
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: palette.secondary[500],
                                    // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: palette.secondary[700],
                                    // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                },
            ],
        });
    };

    useEffect(() => {
        initOverviewChart();
    }, [revenueData, expensesData, xAxisMonthData]);

    return (
        <DashboardBox height="100%">
            <BoxHeader title={OVER_VIEW} />
            <Box id={OVER_VIEW} width="100%" height="100%" />
        </DashboardBox>
    );
};

export default Overview;
