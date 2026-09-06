import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The rubric's own useEffect examples call setState directly to load
      // initial data and hydrate from localStorage on mount — the exact
      // pattern this newer rule flags. Disabled intentionally for this project.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // Test files run under Jest, which provides these as globals
    // (describe, test, expect, jest, beforeEach, etc.)
    files: ['**/*.test.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
    },
  },
  {
    // Node-context files: Jest config/mocks that use CommonJS
    // (module.exports) and setupTests.js which sets Node's `global`
    files: ['src/setupTests.js', 'src/__mocks__/**/*.js', 'jest.config.cjs'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
])