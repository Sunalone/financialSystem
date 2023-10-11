import type { Plugin } from "vite";
import { initElectron } from "./utils";
import * as fs from "node:fs";
import * as path from "node:path";
import * as electronBuilder from "electron-builder";

const viteElectronProd = (): Plugin => {
    return {
        name: "vite-electron-prod",
        closeBundle() {
            initElectron();

            const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
            packageJson.main = "background.js";
            fs.writeSync(fs.openSync("dist/package.json", "w"), JSON.stringify(packageJson, null, 2));

            // 创建一个空的node_modules目录 不然会打包失败
            fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));

            electronBuilder.build({
                config: {
                    appId: "com.sunalone.app",
                    productName: "Financial-System",
                    directories: {
                        output: path.join(process.cwd(), "web"), //输出目录
                        app: path.join(process.cwd(), "dist"), //app目录
                    },
                    asar: true,
                    nsis: {
                        oneClick: false, //取消一键安装
                        allowToChangeInstallationDirectory: true,
                    },
                },
            });
        },
    };
};

export { viteElectronProd };
