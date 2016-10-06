var extend = require('util')._extend
var exec = require('child_process').exec

module.exports = function (command, options, callback) {
  var child = exec(command, extend({env: process.env}, options))

  if (options.timeout) {
    setTimeout(function () {
      var err = new Error('Command timed out after ' + options.timeout + 'ms: ' + command)
      err.code = 124
      callback(err)
    }, options.timeout)
  }

  child.stdout.on('data', function (data) {
    process.stdout.write(data.toString())
  })

  child.stderr.on('data', function (data) {
    process.stderr.write(data.toString())
  })

  child.on('close', function (code) {
    if (code != 0) {
      var err = new Error('Command failed with code ' + code + ': ' + command)
      err.code = code
      callback(err)
    } else {
      callback()
    }
  })
}
