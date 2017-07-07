const runCommand = require('./helpers/run_command')

module.exports = function (project) {
  const tag = `livingdocs/${project}`

  runCommand(`docker build -t ${tag} -f Dockerfile .`, {}, function (err) {
    if (err) process.exit(err.code)
    console.log(`Docker image ${tag} successfully built`)
  })
}
