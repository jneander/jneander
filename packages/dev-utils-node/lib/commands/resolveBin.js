const fs = require('fs')
const path = require('path')

function findBin(binaryName, path) {
  try {
    return fs.realpathSync(`${path}/${binaryName}`)
  } catch (_error) {
    // ignore _error
  }
}

module.exports = function resolveBin(binaryName) {
  const cwd = process.cwd()
  const localPath = path.join(__dirname, '../..')
  const rootPath = path.join(__dirname, '../../../..')

  const cwdBin = `${cwd}/node_modules/.bin`
  const localBin = `${localPath}/node_modules/.bin`
  const rootBin = `${rootPath}/node_modules/.bin`

  resolvedBin =
    findBin(binaryName, cwdBin) || findBin(binaryName, localBin) || findBin(binaryName, rootBin)

  if (resolvedBin) {
    return resolvedBin
  }

  throw new Error(`Unable to locate binary with name '${binaryName}'`)
}
