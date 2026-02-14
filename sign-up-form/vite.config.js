import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    base: '/odin-projects/sign-up-form/',
    build: {
        sourcemap: true,
        outDir: 'dist',
        assetsDir: 'assets',
    },
});