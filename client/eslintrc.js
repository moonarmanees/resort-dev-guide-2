// .eslintrc.js (legacy format)
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true, // This automatically provides Jest globals
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.*'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'no-redeclare': 'off', // Turn off redeclare errors in test files
      },
    },
  ],
};