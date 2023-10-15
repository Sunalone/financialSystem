export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}

export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory[];
    monthlyData: Month[];
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
}

export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export enum EMonth {
    JAN = "JAN",
    FEB = "FEB",
    MAR = "MAR",
    APR = "APR",
    MAY = "MAY",
    JUN = "JUN",
    JUL = "JUL",
    AUG = "AUG",
    SEP = "SEP",
    OCT = "OCT",
    NOV = "NOV",
    DEC = "DEC",
}

export interface GetMonthKpiDataRequest {
    month: string;
}

export interface LoginRequest {
    id: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    result: string;
}
