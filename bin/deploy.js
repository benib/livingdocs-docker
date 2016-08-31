var argv = require('minimist')(process.argv.slice(3))
var path = require('path')
var assert = require('assert')
var runCommand = require('./run_command')

// set up sane defaults
var environment = argv.environment
var stack = argv.stack || environment
var domain = argv.domain || 'branches.rancher.livingdocs.io'
var serverImage = argv.server_image || 'livingdocs/service-server:latest'
var editorImage = argv.editor_image || 'livingdocs/editor:latest'

module.exports = function (project) {
  // required variables in this script
  assert(stack, '--stack must be set');
  assert(environment, '--environment must be set')

  // required variables for rancher-compose cli
  assert(process.env.RANCHER_URL, '$RANCHER_URL must be set')
  assert(process.env.RANCHER_ACCESS_KEY, '$RANCHER_ACCESS_KEY must be set')
  assert(process.env.RANCHER_SECRET_KEY, '$RANCHER_SECRET_KEY must be set')

  // required variables interpolated in docker-compose.yml
  process.env.environment = environment
  process.env.domain = domain
  process.env.server_image = serverImage
  process.env.editor_image = editorImage

  deploymentFinished = function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('Deployed to http://' + project + '.' + stack + domain)
      console.log('Environment: ' + environment)
      console.log('Server: ' + serverImage)
      console.log('Editor: ' + editorImage)
    }
  }

  var deployPath = path.join(__dirname, '..', 'deploy')

  var cmd = 'rancher-compose'
  if (process.env.TRAVIS) cmd = './rancher-compose-linux-386-v0.9.0-rc2'

  runCommand(cmd + ' --project-name ' + stack + ' up -d --pull --force-upgrade --confirm-upgrade', {cwd: deployPath}, deploymentFinished)
}
