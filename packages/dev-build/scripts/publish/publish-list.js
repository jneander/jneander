#!/usr/bin/env node

const path = require('path')

const npmPacklist = require('npm-packlist')

const {getString} = require('@jneander/dev-utils-node').cli

const packagePath = path.join(process.cwd(), 'packages', getString('pkg'))

function logPackageFiles(files) {
  files.sort().forEach(file => {
    console.log(`* ${file}`)
  })
}

npmPacklist({path: packagePath})
  .then(logPackageFiles)
  .catch(error => {
    console.error(error)
  })
