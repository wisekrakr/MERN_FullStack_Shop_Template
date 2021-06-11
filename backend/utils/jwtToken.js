// create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
  // create jwt token and send
  const token = user.getJWTToken();

  // options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // so it can't be accessed by javascript code
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
