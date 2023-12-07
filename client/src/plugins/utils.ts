const esbuild = require("esbuild");

const initElectron = () => {
    // 使用esbuild编译TypeScript代码为JavaScript
    esbuild.buildSync({
        entryPoints: ["src/background.ts"], // 入口文件
        outfile: "dist/background.js", // 输入目录
        bundle: true,
        platform: "node", // 编译的目标平台
        target: "node16", // 编译的目标环境
        external: ["electron"], // 外部依赖项
    });
};

export { initElectron };
