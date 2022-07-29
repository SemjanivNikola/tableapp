module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ["plugin:vue/recommended", "standard"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        quotes: [2, "double", { avoidEscape: true }],
        "vue/script-setup-uses-vars": "error",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 4],
        semi: [2, "always"],
        "space-before-function-paren": ["error", "always"],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "no-multi-spaces": ["error"],
    },
};
