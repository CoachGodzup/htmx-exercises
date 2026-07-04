import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        CodeMirror: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
