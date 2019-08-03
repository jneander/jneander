module.exports = {
  env: {
    production: {
      plugins: [['transform-react-remove-prop-types', {removeImport: true}]]
    }
  },

  presets: [
    [
      '@babel/preset-env',

      {
        corejs: {
          proposals: false,
          version: 3
        },

        modules: false,

        targets: {
          browsers: require('./browserlist')
        },

        useBuiltIns: 'usage'
      }
    ],

    '@babel/react'
  ]
}
