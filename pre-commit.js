const exec = require("child_process").execSync;
// const path = require("path");

// const eslintPath = path.join(__dirname, "node_modules", "bin", "eslint");

try {
    exec(
        "npx eslint . --ext .vue --ext .js --max-warnings 0",
        { stdio: "inherit" },
    );
    console.warn("ESLint check completed with no errors.");
} catch (error) {
    process.exit(-1);
}
