const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");

// Check if current user is authenticated.
// @req       requested  path
// @res       result of the request
// @next      when we are done with this middleware, we move on to the next middleware
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Add user from payload
  req.user = await User.findById(decoded.id);

  next();
});

// Handling user roles
exports.authorizationRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //if role is not included, user cannot go to particular routes
      return next(
        new ErrorHandler(`Not Authorized: Role = (${req.user.role})`, 403)
      );
    }
    next();
  };
};
