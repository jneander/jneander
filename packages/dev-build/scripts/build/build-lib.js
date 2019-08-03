#!/usr/bin/env node

const path = require('path')

const {getEnv} = require('@jneander/dev-utils-node').cli
const {buildCommand, runConcurrently} = require('@jneander/dev-utils-node').commands

const cwd = process.cwd()
const env = {
  NODE_ENV: getEnv('production')
}
const sourcePath = path.join(cwd, 'src')

const ignoreFiles = ['**/*.spec.js', '**/_specs_/**']

function buildArgs(type) {
  const args = [
    '--config-file',
    path.join(__dirname, '../..', `presets/babelrc.${type}.js`),

    '--ignore',
    ignoreFiles.join(','),

    '--out-dir',
    path.join(cwd, type)
  ]

  if (process.argv.includes('--watch')) {
    args.push('--watch')
  }

  return args.concat([sourcePath])
}

runConcurrently({
  'build-lib:es': buildCommand('babel', buildArgs('es'), env),
  'build-lib:lib': buildCommand('babel', buildArgs('lib'), env)
})
