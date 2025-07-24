const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("No token provided or invalid token format");
  }

  token = authHeader.split(" ")[1];

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Use the entire decoded object (e.g., { id: 'user123' })
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized or token has expired");
  }
});

module.exports = auth;
