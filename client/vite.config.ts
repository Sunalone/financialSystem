import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import PostcssPresetEnv from "postcss-preset-env";
import { viteElectronDev, viteElectronProd } from "./src/plugins";

export default defineConfig(({ mode }) => {
    const isProduction = mode === "production";
    const isElectron = process.argv.includes("electron");
    const plugins = [react(), viteElectronProd()];

    if (isElectron) {
        plugins.push(viteElectronDev());
    }

    return {
        base: "./",
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/\/^api/, ""),
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: resolve("./src"),
                },
            ],
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins,
        build: {
            target: "es2015",
            assetsInlineLimit: 1024 * 8, // 8kb
            minify: "terser",
            terserOptions: {
                compress: {
                    drop_console: isProduction ? true : false,
                    drop_debugger: isProduction ? true : false,
                    pure_funcs: isProduction ? ["console.log"] : [],
                },
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return "vendor";
                        }
                    },
                },
            },
            sourcemap: isProduction ? false : true,
        },
        css: {
            postcss: {
                plugins: [PostcssPresetEnv()],
            },
        },
    };
});
