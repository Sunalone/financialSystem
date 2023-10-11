const esbuild = require("esbuild");

const initElectron = () => {
    // 使用esbuild编译TypeScript代码为JavaScript
    esbuild.buildSync({
        entryPoints: ["src/background.ts"],
        outfile: "dist/background.js",
        bundle: true,
        platform: "node",
        target: "node16",
        external: ["electron"],
    });
};

export { initElectron };
