import { useEffect } from "react";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import initChart from "@/state/echarts";
import { useCommonContext } from "@/context/commonContext";

const EXPENSES_CATEGORY = "expensesCategory";
const PRICE_EXPENSES = "priceExpenses";

const RowThree = () => {
    const { palette } = useTheme();
    const { expensesCategoryData, priceExpensesData, productData } =
        useCommonContext();
    const { data: transactionData } = useGetTransactionsQuery();

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ];

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) =>
                (params.value as Array<string>).length,
        },
    ];

    const initExpensesCategoryPieChart = () => {
        initChart(EXPENSES_CATEGORY, {
            tooltip: {
                trigger: "item",
            },
            grid: {
                left: "0.5%",
                right: "2%",
                bottom: "3%",
                containLabel: true,
            },
            series: [
                {
                    name: "ExpensesCategory",
                    type: "pie",
                    data: expensesCategoryData,
                    radius: ["30%", "50%"], // 调整环形图大小
                    center: ["50%", "60%"],
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

    const initPriceExpensesPieChart = () => {
        initChart(PRICE_EXPENSES, {
            tooltip: {
                trigger: "item",
            },
            grid: {
                left: "0.5%",
                right: "2%",
                bottom: "3%",
                containLabel: true,
            },
            series: [
                {
                    name: "ExpensesCategory",
                    type: "pie",
                    data: priceExpensesData,
                    radius: ["30%", "50%"], // 调整环形图大小
                    center: ["50%", "60%"],
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

    useEffect(() => {
        initExpensesCategoryPieChart();
        initPriceExpensesPieChart();
    }, [expensesCategoryData, priceExpensesData]);

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="2rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="2rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
                <FlexBetween width="100%" height="100%">
                    <Box width="55%" height="100%">
                        <BoxHeader title="Expense Breakdown By Category" />
                        <Box
                            id={EXPENSES_CATEGORY}
                            width="100%"
                            height="100%"
                        />
                    </Box>
                    <Box position="relative" width="45%" height="100%">
                        <BoxHeader title="Expenses" sideText="Price" />
                        <Box id={PRICE_EXPENSES} width="100%" height="100%" />
                    </Box>
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="j">
                <BoxHeader
                    title="Overall Summary and Explanation Data"
                    sideText="+15%"
                />
                <Box
                    height="15px"
                    margin="3.2rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    ></Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    Orci aliquam enim vel diam. Venenatis euismod id donec mus
                    lorem etiam ullamcorper odio sed. Ipsum non sed gravida
                    etiam urna egestas molestie volutpat et. Malesuada quis
                    pretium aliquet lacinia ornare sed. In volutpat nullam at
                    est id cum pulvinar nunc.
                </Typography>
            </DashboardBox>
        </>
    );
};

export default RowThree;
