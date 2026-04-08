import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 1. Replaces ignorePatterns: ["dist", ".eslintrc.cjs"]
  globalIgnores(['dist', '.eslintrc.cjs']),

  {
    // 2. Replaces overrides/files targeting
    files: ['**/*.{js,jsx}'],
    
    // 3. Plugin Mapping (Explicitly imported objects)
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      ecmaVersion: 'latest', 
      sourceType: 'module',
      globals: {
        ...globals.browser, // Replaces env: { browser: true }
        ...globals.node,    // Replaces globals: { process: "readonly" }
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      // Replaces settings: { react: { version: "18.2" } }
      // Keeping 18.2 for consistency, though React 19 is installed.
      react: { version: '18.2' }, 
    },

    rules: {
      // 4. Recommended Rule Spreading
      ...js.configs.recommended.rules,
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.flat.recommended.rules,

      // 5. Your Specific Rule Overrides
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 0, 
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])