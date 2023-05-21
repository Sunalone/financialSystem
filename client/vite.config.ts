import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import PostcssPresetEnv from "postcss-preset-env";

export default defineConfig(({ mode }) => {
    const isProduction = mode === "production";

    return {
        base: "./",
        plugins: [react()],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
            extensions: [".tsx", ".ts", ".js"],
        },
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
