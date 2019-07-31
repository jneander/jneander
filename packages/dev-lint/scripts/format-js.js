#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const {getString} = require('@jneander/dev-utils-node').cli
const {buildCommand, runCommandSync} = require('@jneander/dev-utils-node').commands

const cwd = process.cwd()
const args = ['--write']

let configPath = path.join(cwd, getString('config', 'prettier.config.js'))
if (!fs.existsSync(configPath)) {
  configPath = path.join(__dirname, '../presets', 'prettierConfig.js')
}
args.push('--config', configPath)

args.push(getString('pattern', './**/*.js'))

runCommandSync(buildCommand('prettier', args))
