module.exports = exports

exports.handleError = (err) ->
  console.log err.toString()
  @emit('end')
