#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

module.exports = function (project, rootDir) {

	command = 'docker build -f ./node_modules/@livingdocs/docker/'+project+'/Dockerfile '+rootDir

	var child = exec(command)
	child.stdout.on('data', function (data) {
		process.stdout.write(data.toString())
	})
	child.stderr.on('data', function (data) {
		console.log('Build failed with err: ' + data)
	})
	child.on('close', function (code) {
		console.log('Build finished with exit code: ' + code)
	})

}
