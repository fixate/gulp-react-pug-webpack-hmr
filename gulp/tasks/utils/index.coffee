exports.handleError = (err) ->
  console.log err.toString()
  if watching then @emit('end') else process.exit(1)
