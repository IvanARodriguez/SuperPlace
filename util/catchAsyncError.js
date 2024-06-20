/**
 * @param func is the request handler that will execute the async logic
 * @returns a http handler that catches any error that happens during async operations
 */

function catchAsyncError(func) {
  return function (req, res, next) {
    func(req, res, next).catch(next)
  }
}

export default catchAsyncError
