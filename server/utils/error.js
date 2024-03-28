class AppError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

// 비동기 요청 에러 헨들링
function wrapAsync(asyncFn) {
  return (req, res, next) => asyncFn(req, res, next).catch((e) => next(e));
}

module.exports.AppError = AppError;
module.exports.wrapAsync = wrapAsync;
