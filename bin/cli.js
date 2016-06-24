#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var project = argv._[0]
var action = argv._[1]
var cwd = process.cwd()

var actions = {
  'install': require('./install.js'),
  'build': require('./build.js')
}
var func = actions[action]

if(['editor', 'server'].indexOf(project) < 0){
  console.log('Unknown project: ' + project)
} else if(typeof func === 'function'){
  func(project, cwd)
} else {
  console.log('Unknown action: ' + action)
}
