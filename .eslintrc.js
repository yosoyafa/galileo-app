module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "import/order": 0,
    "react-native/no-inline-styles": 0,
    "import/namespace": 0,
    "no-duplicate-imports": "error",
    "prettier/prettier": "error",
  },
  env: {
    node: true,
  },
  ignorePatterns: [
    "node_modules/**",
    "package.json",
    "yarn.lock",
    "ios/**",
    "android/**",
    "assets/**",
    ".vscode",
    ".expo-shared",
    ".prettierrc",
    "eslintrc.js",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "**/tsconfig.json",
      },
    },
  },
};
