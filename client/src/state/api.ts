import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse, LoginRequest, LoginResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL, method: "post" }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions", "MonthData", "Login"],
    endpoints: (build) => ({
        getKpis: build.query<GetKpisResponse[], void>({
            query: () => "kpi/kpis",
            providesTags: ["Kpis"],
        }),
        getProducts: build.query<GetProductsResponse[], void>({
            query: () => "product/products",
            providesTags: ["Products"],
        }),
        getTransactions: build.query<GetTransactionsResponse[], void>({
            query: () => "transaction/transactions",
            providesTags: ["Transactions"],
        }),
        login: build.mutation<LoginResponse, LoginRequest>({
            query(params) {
                return {
                    url: "user/login",
                    method: "post",
                    body: params,
                };
            },
        }),
        register: build.mutation<any, LoginRequest>({
            query(params) {
                return {
                    url: "user/register",
                    method: "post",
                    body: params,
                };
            },
        }),
    }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery, useLoginMutation, useRegisterMutation } =
    api;
