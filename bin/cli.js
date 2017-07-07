#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const path = require('path')

const action = argv._[0]
const cwd = process.cwd()

const getProject = function () {
  const pkg = require(path.join(cwd, 'package.json'))
  const isProject = function (p, name) {
    return (p.dependencies[name] || p.name === name)
  }
  if (isProject(pkg, '@livingdocs/server')) {
    return 'server'
  } else if (isProject(pkg, '@livingdocs/editor')) {
    return 'editor'
  } else {
    console.error('No Dockerfiles available for this project')
  }
}

const getAction = function () {
  const actions = {
    'install': require('./install.js'),
    'build': require('./build.js'),
    'deploy': require('./deploy.js')
  }
  return actions[action]
}

const project = getProject()
const func = getAction()
if (typeof func === 'function') {
  func(project, cwd)
} else {
  console.error(`Unknown action: ${action}`)
}
