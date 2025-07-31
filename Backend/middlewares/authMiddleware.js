import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      
      req.user = decoded.createUser;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Token missing or malformed");
  }
});

export default validateToken;
