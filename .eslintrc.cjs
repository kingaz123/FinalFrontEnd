module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  paserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  ignorePatterns: ["**/typescript/*.ts"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
  },

};

