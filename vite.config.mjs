import { defineConfig } from "vite";
import atomico from "@atomico/vite";

export default defineConfig({
    root: "example",
    build: {
        target: "esnext",
    },
    plugins: [
        atomico({
            cssLiterals: {
                minify: true,
                postcss: true,
            },
        }),
    ],
});
