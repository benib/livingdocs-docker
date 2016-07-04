var path = require('path')
var fs = require('fs-extra')

module.exports = function (project, targetPath) {
	var sourcePath = path.join(__dirname, '..', project)
	var dockerPath = path.join(targetPath, 'docker')

	fs.copy(sourcePath, dockerPath, {clobber: true}, function (err) {
		if (err) return console.error('Failed copying Docker files: ', err)
		console.log('Docker files copied successfully')

		fs.move(path.join(dockerPath, '.dockerignore'), path.join(targetPath, '.dockerignore'), {clobber: true}, function (err) {
			if (err) return console.error(err)
			console.log('Docker dotfiles copied successfully')
		})
	})
}
