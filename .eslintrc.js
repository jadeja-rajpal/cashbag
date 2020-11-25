module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "16.12.0",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["src"],
      },
    },
  },
  rules: {
    "global-require": 0,
    "function-paren-newline": 0,
    "react/forbid-prop-types": 0,
    "comma-dangle": 0,
    "import/named": 0,
    "no-underscore-dangle": 0,
    "import/no-webpack-loader-syntax": 0,
    camelcase: 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/no-danger": 0,
    "no-nested-ternary": 0,
    "prefer-rest-params": 0,
    "import/no-cycle": 0,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
};
