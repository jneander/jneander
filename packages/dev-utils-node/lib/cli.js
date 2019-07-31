function getEntry(argName) {
  const index = process.argv.findIndex(entry => entry.startsWith(`--${argName}`))
  if (index > 0) {
    return process.argv.slice(index, index + 2)
  }
  return []
}

function getEnv(defaultEnv = 'production') {
  return ['development', 'production', 'test'].includes(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : defaultEnv
}

function getFlag(argName) {
  return process.argv.includes(`--${argName}`)
}

function getInteger(argName, defaultValue = null) {
  const entries = getEntry(argName)
  const parsed = parseInt(entries[1], 10)
  return isNaN(parsed) ? defaultValue : parsed
}

function getString(argName, defaultValue = null) {
  const entries = getEntry(argName)
  return entries[1] || defaultValue
}

function getStringArray(argName, defaultValue = []) {
  const entries = getString(argName)
  return entries[1] ? entries[1].split(',').map(value => value.trim()) : defaultValue
}

function getVar(argName, defaultValue = null) {
  const variable = process.argv.find(v => v.startsWith(`${argName}=`))
  if (variable) {
    return variable.split('=')[1]
  }
  return defaultValue
}

function getVarFlag(argName) {
  return process.argv.find(v => v.startsWith(`${argName}=`))
}

function getVarInteger(argName) {
  return parseInt(getVar(argName), 10)
}

module.exports = {
  getEnv,
  getFlag,
  getInteger,
  getString,
  getStringArray,
  getVar,
  getVarFlag,
  getVarInteger
}
