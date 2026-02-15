import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            "prettier/prettier": ["error", {
                "singleQuote": true,  
                "trailingComma": "none",
                "semi": true,          
                "printWidth": 80
            }],
            "no-unused-vars": "warn",
            "no-console": "warn",
        },
    },
    {
        ignores: [
            "commitlint.config.js",
            "eslint.config.js",
            "vite.config.js",
            "prettier.config.js",
            "node_modules/**",
            "dist/**",
        ],
    },
];
