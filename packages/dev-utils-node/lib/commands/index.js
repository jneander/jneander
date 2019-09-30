const execa = require('execa')

const resolveBin = require('./resolveBin')

function buildCommand(bin, args = [], env = {}) {
  return {
    args,
    bin: resolveBin(bin),
    env
  }
}

function crossEnvCommand(command) {
  const vars = Object.keys(command.env).reduce((list, key) => [
    ...list,
    `${key}=${command.env[key]}`
  ], [])

  const varString = vars.length ? vars.join(' ') + ' ' : ''
  const argString = command.args.length ? ' ' + command.args.join(' ') : ''

  return `${resolveBin('cross-env')} ${varString}${command.bin}${argString}`
}

function runConcurrently(commands) {
  const args = [
    '--kill-others-on-fail',

    '--prefix',
    '[{name}]',

    '--names',
    Object.keys(commands).join(','),

    '--prefix-colors',
    'bgBlue.bold,bgMagenta.bold,bgGreen.bold',

    '--success',
    'all'
  ]

  Object.keys(commands).forEach(name => {
    args.push(crossEnvCommand(commands[name]))
  })

  let result = {status: 1}

  try {
    const command = buildCommand('concurrently', args)
    result = runCommandSync(command)
  } catch (err) {
    console.error(err)
  }

  return result
}

function runCommandSync(command, opts = {}) {
  try {
    const result = execa.sync(command.bin, command.args, {
      env: {FORCE_COLOR: true, ...command.env},
      stdio: 'inherit'
    })
    result.status = result.status || result.code
    return result
  } catch(error) {
    return {status: 1}
  }
}

module.exports = {
  buildCommand,
  runCommandSync,
  runConcurrently
}
