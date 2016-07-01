#!/usr/bin/env node

var path = require('path')
var cpy = require('cpy')

module.exports = function (project, targetPath) {
	var sourcePath = path.resolve(path.join('node_modules', '@livingdocs', 'docker', project))
	var files = ['docker-compose.yml', 'Dockerfile', '.dockerignore']

	cpy(files, targetPath, {cwd: sourcePath, overwrite: true}).then(function () {
		console.log('Docker files copied successfully')
	}).catch(function (err){
		console.log('Failed copying Docker files: ', err)
	})
}
