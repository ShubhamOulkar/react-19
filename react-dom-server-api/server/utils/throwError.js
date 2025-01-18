class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "🚨 Fail" : "❌ Error";

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

const throwError = (message, statusCode) => {
  throw new AppError(message, statusCode);
};

export { AppError, throwError };
