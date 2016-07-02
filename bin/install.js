var path = require('path')
var copy = require('recursive-copy')

module.exports = function (project, targetPath) {
	var sourcePath = path.resolve(path.join('node_modules', '@livingdocs', 'docker', project))

	copy(sourcePath, path.join(targetPath, 'docker'), {overwrite: true}, function(err){
		if(err){
			console.error('Failed copying Docker files: ', err)
		} else {
			console.log('Docker files copied successfully')
		}
	})
}
