var runCommand = require('./helpers/run_command')

module.exports = function (project) {
  var tag = 'livingdocs/' + project

  runCommand('docker build -t ' + tag + ' -f Dockerfile .', {}, function () {
    console.log('Docker image ' + tag + ' successfully built')
  })
}
