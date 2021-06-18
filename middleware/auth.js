const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header("x-auth-token");

  // If no token throw error
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorisation denied." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
