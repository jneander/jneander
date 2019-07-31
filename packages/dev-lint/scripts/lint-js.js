#!/usr/bin/env node

/*
 * For reference:
 * https://eslint.org/docs/user-guide/command-line-interface
 */

const fs = require('fs')
const path = require('path')

const {getFlag, getString} = require('@jneander/dev-utils-node').cli
const {buildCommand, runCommandSync} = require('@jneander/dev-utils-node').commands

const cwd = process.cwd()
const args = []

let configPath = path.join(cwd, getString('config', '.eslintrc.js'))
if (!fs.existsSync(configPath)) {
  configPath = path.join(__dirname, '../presets', 'eslintConfig.js')
}
args.push('--config', configPath)

if (getFlag('fix')) {
  args.push('--fix')
}

args.push(getString('pattern', './**/*.js'))

runCommandSync(buildCommand('eslint', args))
