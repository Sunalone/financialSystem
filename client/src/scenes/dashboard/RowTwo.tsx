import { useEffect } from "react";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useTheme, Box, Typography } from "@mui/material";
import initChart from "@/state/echarts";
import FlexBetween from "@/components/FlexBetween";
import { useCommonContext } from "@/context/commonContext";

const EXPENSES = "expenses";
const TOTAL = "total";
const PRICEANDEXPENSES = "priceAndExpenses";

const RowTwo = () => {
    const { palette } = useTheme();

    const {
        xAxisMonthData,
        operationalExpenses,
        nonOperationalExpenses,
        scatterData,
        totalData,
    } = useCommonContext();

    const initExpensesChart = () => {
        initChart(EXPENSES, {
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
                    name: "expenses",
                    type: "line",
                    data: operationalExpenses,
                    smooth: 0.2,
                    itemStyle: {
                        color: palette.primary[700],
                    },
                },
                {
                    name: "profit",
                    type: "line",
                    data: nonOperationalExpenses,
                    smooth: 0.6,
                    itemStyle: {
                        color: palette.tertiary[500],
                    },
                    yAxisIndex: 1,
                },
            ],
        });
    };

    const initTotalPieChart = () => {
        initChart(TOTAL, {
            tooltip: {
                trigger: "item",
                axisPointer: {
                    type: "shadow",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            grid: {
                left: "0.5%",
                right: "2%",
                bottom: "3%",
                containLabel: true,
            },
            series: [
                {
                    name: "Profit And Expenses",
                    type: "pie",
                    data: totalData,
                    radius: ["30%", "50%"], // 调整环形图大小
                    center: ["50%", "55%"],
                    avoidLabelOverlap: false,
                    animation: false,
                    label: {
                        formatter: "{d}%",
                        color: palette.grey[200],
                    },
                },
            ],
        });
    };

    const initPriceExpensesScatterChart = () => {
        initChart(PRICEANDEXPENSES, {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            grid: {
                left: "4%",
                right: "2.5%",
                top: "18%",
                bottom: "12%",
            },
            xAxis: {
                axisTick: {
                    show: false,
                },
                splitLine: { show: false },
            },
            yAxis: {
                splitLine: { show: false },
                axisTick: {
                    show: false,
                },
            },
            series: [
                {
                    symbolSize: 10,
                    data: scatterData,
                    type: "scatter",
                    itemStyle: {
                        color: palette.tertiary[500],
                    },
                },
            ],
        });
    };

    useEffect(() => {
        initExpensesChart();
        initTotalPieChart();
        initPriceExpensesScatterChart();
    }, [
        xAxisMonthData,
        operationalExpenses,
        nonOperationalExpenses,
        scatterData,
        totalData,
    ]);

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <Box id={EXPENSES} width="100%" height="100%" />
            </DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title="Campaigns and Targets" />
                <FlexBetween
                    mt="0.25rem"
                    gap="1.5rem"
                    pr="1.5rem"
                    height="100%"
                >
                    <Box id={TOTAL} width="65%" height="100%" />
                    <Box flexBasis="50%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography
                            m="0.3rem 0"
                            variant="h3"
                            color={palette.primary[300]}
                        >
                            80%
                        </Typography>
                        <Typography variant="h6">
                            Finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">
                            Losses are down 25%
                        </Typography>
                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" />
                <Box id={PRICEANDEXPENSES} width="100%" height="100%" />
            </DashboardBox>
        </>
    );
};

export default RowTwo;
