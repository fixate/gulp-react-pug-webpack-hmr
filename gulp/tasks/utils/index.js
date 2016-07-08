function handleError(err) {
  console.log(err.toString());
  return this.emit('end');
}

module.exports = {
  handleError,
};
