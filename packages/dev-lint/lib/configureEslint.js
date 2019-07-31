/*
 * For reference:
 * https://eslint.org/docs/user-guide/configuring
 */

function normalizeConfig(config) {
  return {
    browser: config.browser === true,
    mocha: config.mocha !== false,
    node: config.node === true,
    react: config.react === true
  }
}

function buildEnv(config) {
  return {
    browser: config.browser === true,
    es6: true,
    mocha: config.mocha !== false,
    node: config.node === true
  }
}

function buildExtends(config) {
  const extensions = [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended'
  ]

  if (config.node) {
    extensions.push('plugin:node/recommended')
  }

  if (config.react) {
    extensions.push('prettier/react', 'plugin:react/recommended')
  }

  return extensions
}

function buildOverrides(config) {
  const overrides = []

  if (config.mocha) {
    overrides.push({
      files: ['./**/*.spec.js', './**/_specs_/**/*.js'],

      globals: {
        expect: 'writable'
      }
    })
  }

  return overrides
}

function buildPlugins(config) {
  const plugins = ['import', 'prettier', 'promise']

  if (config.mocha) {
    plugins.push('mocha')
  }

  if (config.node) {
    plugins.push('node')
  }

  if (config.react) {
    plugins.push('jsx-a11y', 'react', 'react-hooks')
  }

  return plugins
}

function buildRules(config) {
  const rules = {
    'eslint-comments/no-unused-disable': 'error',
    'import/extensions': ['error', 'ignorePackages', {js: 'never'}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}]
  }

  if (config.node) {
    Object.assign(rules, {
      'global-require': 'off'
    })
  }

  if (config.react) {
    Object.assign(rules, {
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-filename-extension': ['error', {extensions: ['.js']}]
    })
  }

  return rules
}

function buildSettings(config) {
  const settings = {}

  if (config.react) {
    settings.react = {
      version: '16'
    }
  }

  return settings
}

module.exports = function configureEslint(config = {}) {
  const normalizedConfig = normalizeConfig(config)

  return {
    env: buildEnv(normalizedConfig),
    extends: buildExtends(normalizedConfig),
    globals: {},
    overrides: buildOverrides(normalizedConfig),

    parserOptions: {
      ecmaFeatures: {
        jsx: normalizedConfig.react
      },

      ecmaVersion: 2018,
      sourceType: 'module'
    },

    parser: 'babel-eslint',
    plugins: buildPlugins(normalizedConfig),
    root: true,
    rules: buildRules(normalizedConfig),
    settings: buildSettings(normalizedConfig)
  }
}
