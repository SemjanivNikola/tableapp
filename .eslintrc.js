module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["plugin:vue/essential", "standard"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    quotes: ["double", { avoidEscape: true }],
    "vue/script-setup-uses-vars": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 2],
    semi: ["error", "never"],
    "space-before-function-paren": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "always",
        exports: "always",
        functions: "always",
      },
    ],
  },
};
