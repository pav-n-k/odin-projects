import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@styles": resolve(__dirname, "src/styles"),
        },
    },
    base: "/odin-projects/tic-tac-toe",
    build: {
        sourcemap: true,
        outDir: "build",
        assetsDir: "assets",
    },
});
