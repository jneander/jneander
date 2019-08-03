#!/usr/bin/env node

const {runCommandSync, buildCommand} = require('@jneander/dev-utils-node').commands

const paths = ['es', 'lib']

runCommandSync(buildCommand('rimraf', paths))
