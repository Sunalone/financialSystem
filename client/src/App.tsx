import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Overview from "@/scenes/overview";
import Login from "@/scenes/login";
import CommonContextProvider from "./context/commonContext";

const App: React.FC = () => {
    const theme = useMemo(() => createTheme(themeSettings), []);

    return (
        <div className="app">
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
                        <NavBar />
                        <CommonContextProvider>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/overview" element={<Overview />} />
                            </Routes>
                        </CommonContextProvider>
                    </Box>
                </ThemeProvider>
            </HashRouter>
        </div>
    );
};

export default App;
