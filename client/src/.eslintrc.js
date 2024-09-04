module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
      // Your custom rules
    },
  };
  