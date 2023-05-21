import {
    useMemo,
    useContext,
    createContext,
    JSXElementConstructor,
    ReactElement,
    ReactFragment,
    ReactPortal,
} from "react";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { GetProductsResponse } from "@/state/types";

interface commonType {
    value: number;
    name: string;
    itemStyle: {
        color: string;
    };
}

interface ICommonContext {
    revenueData?: number[];
    expensesData?: number[];
    xAxisMonthData?: string[];
    profitData?: string[];
    operationalExpenses?: number[];
    nonOperationalExpenses?: number[];
    scatterData?: number[][];
    totalData?: commonType[];
    expensesCategoryData?: commonType[];
    priceExpensesData?: commonType[];
    productData?: GetProductsResponse[];
}

interface CommonContextProps {
    children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
}

const Context = createContext<ICommonContext | null>(null);

export const useCommonContext = () => {
    const value = useContext(Context);
    if (value === null) {
        throw new Error("value is null");
    }
    return value;
};

const CommonContext = (props: CommonContextProps) => {
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { palette } = useTheme();

    const monthlyData = kpiData?.[0].monthlyData ?? [];

    const revenueData = useMemo(() => {
        return monthlyData && monthlyData.map((item) => item.revenue);
    }, [monthlyData]);

    const expensesData = useMemo(() => {
        return monthlyData && monthlyData.map((item) => item.expenses);
    }, [monthlyData]);

    const xAxisMonthData = useMemo(() => {
        return (
            monthlyData &&
            monthlyData.map((item) => item.month.substring(0, 3).toUpperCase())
        );
    }, [monthlyData]);

    const profitData = useMemo(() => {
        return (
            monthlyData &&
            monthlyData.map((item) => (item.revenue - item.expenses).toFixed(2))
        );
    }, [monthlyData]);

    const operationalExpenses = useMemo(() => {
        return (
            monthlyData && monthlyData.map((item) => item.operationalExpenses)
        );
    }, [monthlyData]);

    const nonOperationalExpenses = useMemo(() => {
        return (
            monthlyData &&
            monthlyData.map((item) => item.nonOperationalExpenses)
        );
    }, [monthlyData]);

    const scatterData = useMemo(() => {
        return (
            productData && productData.map((item) => [item.price, item.expense])
        );
    }, [productData]);

    const totalData = useMemo(() => {
        if (!kpiData?.length) {
            return;
        }
        const totalProfit = kpiData[0].totalProfit;
        const totalExpenses = kpiData[0].totalExpenses;

        return [
            {
                value: totalProfit,
                name: "profit",
                itemStyle: {
                    color: palette.primary[300],
                },
            },
            {
                value: totalExpenses,
                name: "expenses",
                itemStyle: {
                    color: palette.primary[700],
                },
            },
        ];
    }, [kpiData]);

    const expensesCategoryData = useMemo(() => {
        if (!kpiData?.length) {
            return;
        }

        const expensesByCategory = kpiData[0].expensesByCategory[0];
        const dataKeyList = Object.entries(expensesByCategory);

        return dataKeyList.map((item, index) => ({
            name: item[0],
            value: parseInt(item[1].substring(1)),
            itemStyle: {
                color: palette.primary[(index + 1) * 200],
            },
        }));
    }, [kpiData]);

    const priceExpensesData = useMemo(() => {
        if (!productData?.length) {
            return;
        }
        const totalExpense = Math.round(
            productData
                .map((item) => item.expense)
                .reduce((pre, current) => pre + current, 0),
        );
        const totalPrice = Math.round(
            productData
                .map((item) => item.price)
                .reduce((pre, current) => pre + current, 0),
        );
        return [
            {
                name: "expenses",
                value: totalExpense,
                itemStyle: {
                    color: palette.primary[300],
                },
            },
            {
                name: "price",
                value: totalPrice,
                itemStyle: {
                    color: palette.primary[600],
                },
            },
        ];
    }, [productData]);

    const value = useMemo(
        () => ({
            revenueData,
            expensesData,
            xAxisMonthData,
            profitData,
            operationalExpenses,
            nonOperationalExpenses,
            scatterData,
            totalData,
            expensesCategoryData,
            priceExpensesData,
            productData,
        }),
        [kpiData, productData],
    );

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default CommonContext;
