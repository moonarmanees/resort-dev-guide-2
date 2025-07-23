// client/eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    // Ignore the build output directory globally
    ignores: ["dist/**"], 
  },
  // --- Configuration #1: For your main React application files ---
  {
    files: ["src/**/*.{js,jsx}"],
    // Do not apply this configuration to test files
    ignores: ["src/**/__tests__/**", "src/**/*.test.{js,jsx}"], 
    ...pluginReactConfig,
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with modern React/Vite
      "react/prop-types": "off",       // Turn off if you're not using it consistently
    },
  },
  // --- Configuration #2: Specifically for your Jest test files ---
  {
    files: ["src/**/__tests__/**/*.{js,jsx}", "src/**/*.test.{js,jsx}"],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      "jest/prefer-expect-assertions": "off", // Optional: relax rule requiring expect in every test
    },
  },
];