import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'public/scripts/sidebar.js'], // Ignoring sidebar.js for now
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        dataLayer: 'readonly',
        gtag: 'readonly',
        FB: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'argsIgnorePattern': '^_' }],
      'no-undef': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn', // Downgrade to warning for now
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        dataLayer: 'readonly',
        gtag: 'readonly',
        FB: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Also apply here for consistency if JS rules cascade
      'no-undef': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // Downgrade to warning
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Often not used in TSX with typed props
    },
  },
  // Specific configuration for AMPArticle.tsx to allow AMP-specific attributes
  {
    files: ['src/components/AMPArticle.tsx'],
    plugins: { // Ensure plugins are declared if their rules are used
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      'react/no-unknown-property': ['warn', { ignore: ['amp', 'amp-boilerplate'] }], // Downgraded to warn
      'jsx-a11y/html-has-lang': 'off',
    },
  },
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        LottiePlayer: 'readonly',
        trending: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'jsx-a11y': jsxA11yPlugin, // Added jsx-a11y plugin here
    },
    rules: {
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-undef': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'react/prop-types': 'off',
      'jsx-a11y/alt-text': 'warn',
      // Astro components might not always have a single root, e.g. fragments or style tags
      // This rule might be too strict for .astro files if not handled by astro-eslint-parser
      'react/jsx-no-useless-fragment': 'off',
      'astro/no-deprecated-astro-resolve': 'warn',
      'astro/no-unused-css-selector': 'warn',
      'astro/semi': 'warn',
      // If astro files are still having parsing issues with JSX:
      // 'react/jsx-filename-extension': 'off',
      // It's possible the default parser for astro isn't fully compatible with all react rules
    },
  }
];
