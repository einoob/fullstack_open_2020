const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
		console.log('erroreis\n')
    console.error(...params)
  }
}

module.exports = {
  info, error
}
