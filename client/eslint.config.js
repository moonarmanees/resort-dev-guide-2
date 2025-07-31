// client/eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    ignores: ["dist/**"],
  },
  // --- Configuration #1: For your main React application files ---
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["src/**/__tests__/**", "src/**/*.test.{js,jsx}"], 
    ...pluginReactConfig,
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      globals: { ...globals.browser },
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  // --- Configuration #2: Specifically for your Jest test files ---
  {
    files: ["src/**/__tests__/**/*.{js,jsx}", "src/**/*.test.{js,jsx}"],
    // Apply BOTH the React config (for JSX) and the Jest config
    ...pluginReactConfig,
    ...jestPlugin.configs['flat/recommended'],
    settings: { react: { version: "detect" } },
    rules: {
      // Keep Jest's recommended rules
      ...jestPlugin.configs['flat/recommended'].rules,
      // And turn off rules not needed in tests
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];