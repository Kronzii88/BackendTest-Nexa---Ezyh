const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = require("../config/environment");
const { Admin } = require("../models");

module.exports = function (req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    // Extract token from bearer token
    const token = bearerToken.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SIGNATURE_KEY);
    req.user = payload;

    next();
  } catch (err) {
    res.status(401).json({
      status: "FAIL",
      data: {
        name: "UNAUTHORIZED",
        message: "Invalid token",
      },
    });
  }
};
