class ExpressError extends Error {
  constructor(message, responseStatusCode) {
    super()
    this.message = message
    this.statusCode = responseStatusCode
  }
}

export default ExpressError
