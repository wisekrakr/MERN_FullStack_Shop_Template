const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  switch (process.env.NODE_ENV) {
    case "DEVELOPMENT":
      res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,
        stack: err.stack,
      });
      break;
    case "PRODUCTION":
      let error = { ...err };

      error.message = err.message;
      let message;

      switch (err.name) {
        case "CastError":
          // wrong mongoose object ID error
          message = `Resource not found. Invalid: ${err.path}`;
          break;
        case "ValidationError":
          // handling mongoose validation error
          message = Object.values(err.errors).map((value) => value.message);
          break;
        case "MongoError":
          // handling mongoose duplicate key error: Code 11000
          message = `Duplicate ${Object.keys(err.keyValue)} entered`;
          break;
        case "JsonWebTokenError":
          // handling wrong JWT error
          message = "JSON Web Token is invalid!";
          break;
        case "TokenExpiredError":
          // handling expired JWT error
          message = "JSON Web Token is expired!";
          break;
        default:
          message = `Could not handle ErrorCode: ${err.code} \n\n Error: ${err.message}`;
      }

      error = new ErrorHandler(message, 400);

      res.status(error.statusCode).json({
        succes: false,
        message: error.message || "Internal Server Error",
      });
      break;
    default:
      res.status(500).json({
        succes: false,
        error: err.stack,
        message: "Project must use production or development mode",
      });
  }
};
