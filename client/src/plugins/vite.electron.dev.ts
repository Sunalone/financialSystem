import { Plugin } from "vite";
import { initElectron } from "./utils";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import type { AddressInfo } from "net";
import * as fs from "node:fs";
const electron = require("electron");

const viteElectronDev = (): Plugin => {
    return {
        name: "vite-electron-dev",
        configureServer(server) {
            initElectron();

            server.httpServer?.once("listening", () => {
                const addressInfo = server?.httpServer?.address() as AddressInfo;
                const IP = `http://localhost:${addressInfo.port}`;
                const createElectronProcess = () => spawn(electron as unknown as string, ["dist/background.js", IP]);
                createElectronProcess;
                let electronProcess: ChildProcessWithoutNullStreams = createElectronProcess();

                fs.watchFile("src/background.ts", () => {
                    // 杀死当前的Electron进程
                    electronProcess.kill();
                    // 重新编译主进程代码并重新启动Electron进程
                    initElectron();
                    electronProcess = createElectronProcess();
                });

                // 监听Electron进程的stdout输出
                electronProcess.stdout?.on("data", (data) => {
                    console.log(`日志: ${data}`);
                });
            });
        },
    };
};

export { viteElectronDev };
