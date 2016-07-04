var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

module.exports = function (project, rootDir) {
  command = 'docker build -t livingdocs/' + project + ' -f Dockerfile .'
  var child = exec(command, {env: process.env})
  child.stdout.on('data', function (data) {
    process.stdout.write(data.toString())
  })
  child.stderr.on('data', function (data) {
    process.stderr.write(data.toString())
  })
  child.on('close', function (code) {
    if (code > 0) console.error('Are the latest Dockerfiles installed? Run: li-docker install')
    console.log('Build finished with exit code: ' + code)
  })
}
