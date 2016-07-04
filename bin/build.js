var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

module.exports = function (project, rootDir) {

	var dockerPath = path.join(rootDir, 'docker')
	fs.lstat(dockerPath, function(err){
		if(err){
			console.error('Dockerfiles not installed, run li-docker install first')
		} else {
			build()
		}
	})

}

build = function() {
	command = 'docker build -f docker/Dockerfile .'
	var child = exec(command, {env: process.env})
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
