export default [
    {
        files: ["**/*.mjs"],
        languageOptions: {
            sourceType: "module",
            globals: {
                document: "readonly",
                console: "readonly",
                fetch: "readonly",
                alert: "readonly",
                setTimeout: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn", // Warn about unused variables
            "no-console": "off", // Allow console logs for debugging
            "quotes": ["error", "double"], // Enforce double quotes
            "semi": ["error", "always"], // Require semicolons
            "indent": ["error", 4], // Enforce consistent indentation
            "eqeqeq": "error", // Require strict equality (===)
            "no-undef": "off" // Disable undefined variable errors for browser functions
        }
    }
];
