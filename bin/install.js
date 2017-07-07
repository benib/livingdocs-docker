const path = require('path')
const fs = require('fs-extra')

module.exports = function (project, targetPath) {
  const sourcePath = path.join(__dirname, '..', project)
  fs.copy(sourcePath, targetPath, {clobber: true}, function (err) {
    if (err) return console.error('Failed copying Docker files: ', err)
    console.log('Docker files copied successfully')
  })
}
