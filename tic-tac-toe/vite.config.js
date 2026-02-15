import {defineConfig} from "vite";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@styles": resolve(__dirname, "src/styles"),
        },
    },
    base: "/odin-projects/tic-tac-toe/",
    build: {
        sourcemap: true,
        outDir: "dist",
        assetsDir: "assets",
    },
});
