import eslint from 'eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['.gitignore'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
    },
  },
  prettierConfig,
];