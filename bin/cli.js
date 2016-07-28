#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var path = require('path')

var action = argv._[0]
var cwd = process.cwd()

getProject = function () {
  var pkg = require(path.join(cwd, 'package.json'))
  var isProject = function (p, name) {
    return (p.dependencies[name] || p.name == name)
  }
  if (isProject(pkg, '@livingdocs/server')) {
    return 'server'
  } else if (isProject(pkg, '@livingdocs/editor')) {
    return 'editor'
  } else {
    console.error('No Dockerfiles available for this project')
  }
}

getAction = function () {
  var actions = {
    'install': require('./install.js'),
    'build': require('./build.js'),
    'deploy': require('./deploy.js')
  }
  return actions[action]
}

var project = getProject()
var func = getAction()
if (typeof func === 'function') {
  func(project, cwd)
} else {
  console.error('Unknown action: ' + action)
}
