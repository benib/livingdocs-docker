const extend = require('util')._extend
const exec = require('child_process').exec

module.exports = function (command, options, callback) {
  const child = exec(command, extend({env: process.env}, options))

  if (options.timeout) {
    setTimeout(function () {
      const err = new Error(`Command timed out after ${options.timeout}ms: ${command}`)
      err.code = 124
      return callback(err)
    }, options.timeout)
  }

  child.stdout.on('data', function (data) {
    process.stdout.write(data.toString())
  })

  child.stderr.on('data', function (data) {
    process.stderr.write(data.toString())
  })

  child.on('close', function (code) {
    if (code !== 0) {
      const err = new Error(`Command failed with code ${code}: ${command}`)
      err.code = code
      return callback(err)
    } else {
      return callback()
    }
  })
}
