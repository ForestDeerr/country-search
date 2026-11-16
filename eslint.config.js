import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        ignores: ['dist/**', 'assets/**', 'node_modules/**', 'coverage/**'],
    },
    {
        files: ['**/*.{js,ts}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.es6,
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            'import-x': importPlugin,
        },
        rules: {
            'no-debugger': 'off',
            'no-console': 'off',
            'class-methods-use-this': 'off',
        },
    },
    prettierRecommended
);
