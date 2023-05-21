import { useEffect } from "react";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import initChart from "@/state/echarts";
import { useTheme, Box } from "@mui/material";
import { useCommonContext } from "@/context/commonContext";

const REVENUE_EXPENSES = "revenueExpenses";
const PROFIT = "profix";
const REVENUE = "revenue";

const RowOne = () => {
    const { palette } = useTheme();

    const { revenueData, expensesData, xAxisMonthData, profitData } =
        useCommonContext();

    const initRevenueExpensesChart = () => {
        initChart(REVENUE_EXPENSES, {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            xAxis: {
                type: "category",
                data: xAxisMonthData,
                boundaryGap: false,
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
            yAxis: {
                type: "value",
                splitLine: { show: false },
            },
            series: [
                {
                    name: "revenue",
                    type: "line",
                    areaStyle: {},
                    data: revenueData,
                    smooth: 0.2,
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
                                    offset: 0.5,
                                    color: palette.primary[700],
                                    // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: palette.primary[900], // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                },
                {
                    name: "expenses",
                    type: "line",
                    areaStyle: {},
                    data: expensesData,
                    smooth: 0.6,
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
                                    offset: 0.5,
                                    color: palette.primary[700],
                                    // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: palette.primary[900], // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                },
            ],
        });
    };

    const initProfitChart = () => {
        initChart(PROFIT, {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            legend: {
                top: "15%",
                data: [
                    {
                        name: "revenue",
                        textStyle: {
                            color: palette.primary[700],
                        },
                    },
                    {
                        name: "profit",
                        textStyle: {
                            color: palette.tertiary[500],
                        },
                    },
                ],
            },
            xAxis: {
                type: "category",
                data: xAxisMonthData,
                boundaryGap: false,
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
                {
                    type: "value",
                    splitLine: { show: false },
                },
            ],
            series: [
                {
                    name: "revenue",
                    type: "line",
                    data: revenueData,
                    smooth: 0.2,
                    itemStyle: {
                        color: palette.primary[700],
                    },
                },
                {
                    name: "profit",
                    type: "line",
                    data: profitData,
                    smooth: 0.6,
                    itemStyle: {
                        color: palette.tertiary[500],
                    },
                    yAxisIndex: 1,
                },
            ],
        });
    };

    const initRevenueChart = () => {
        initChart(REVENUE, {
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
            ],
        });
    };

    useEffect(() => {
        initRevenueExpensesChart();
        initProfitChart();
        initRevenueChart();
    }, [revenueData, expensesData, xAxisMonthData, profitData]);

    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader
                    title="Revenue and Expenses"
                    subTitle="top line represents revenue, bottom line represents expenses"
                    sideText="+4%"
                />
                <Box id={REVENUE_EXPENSES} width="100%" height="100%" />
            </DashboardBox>
            <DashboardBox gridArea="b">
                <BoxHeader
                    title="Profit and Revenue"
                    subTitle="top line represents revenue, bottom line represents expenses"
                    sideText="+4%"
                />
                <Box id={PROFIT} width="100%" height="100%" />
            </DashboardBox>
            <DashboardBox gridArea="c">
                <BoxHeader
                    title="Revenue Month by Month"
                    subTitle="graph representing the revenue month by month"
                    sideText="+4%"
                />
                <Box id={REVENUE} width="100%" height="100%" />
            </DashboardBox>
        </>
    );
};

export default RowOne;
