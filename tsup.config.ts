import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
    minify: true,
    outExtension: (ctx) => ({ js: `.${ctx.format}.js` }),
});
