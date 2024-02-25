import jwt from 'jsonwebtoken';
import asyncHanler from './asyncHandler.js';
import User from '../models/userModel';

// Protected Routes (required user to logged in to access the api)
export const protect = asyncHanler(async (req, res, next) => {
  let token;

  // Read the token from jwt
  token = req.cookie.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});
