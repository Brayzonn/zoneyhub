module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: require.resolve('./tsconfig.json')
  },
  plugins: ['react-refresh', 'react', 'jsx-a11y', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-no-target-blank': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-direct-mutation-state': 'error',
    'react/jsx-key': 'warn',
    'react/self-closing-comp': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};