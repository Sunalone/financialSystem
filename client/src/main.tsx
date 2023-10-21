import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);
