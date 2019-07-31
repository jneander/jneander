const configureEslint = require('./lib/configureEslint')

module.exports = configureEslint({
  browser: false,
  mocha: false,
  node: true,
  react: false
})
