import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { api } from "@/state/api";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
