var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

module.exports = function (project, rootDir) {
	var dockerPath = path.join(rootDir, 'docker')

	var build = function () {
		command = 'docker build -t livingdocs/' + project + ' -f docker/Dockerfile .'
		var child = exec(command, {env: process.env})
		child.stdout.on('data', function (data) {
			process.stdout.write(data.toString())
		})
		child.stderr.on('data', function (data) {
			process.stderr.write(data.toString())
		})
		child.on('close', function (code) {
			console.log('Build finished with exit code: ' + code)
		})
	}

	fs.lstat(dockerPath, function (err) {
		if (err) return console.error('Dockerfiles not installed, run li-docker install first')
		build()
	})

}
