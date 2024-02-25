import jwt from 'jsonwebtoken';
import asyncHanler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protected Routes (required user to logged in to access the api)
const protect = asyncHanler(async (req, res, next) => {
  // Read the token from jwt
  let token = req.cookies.jwt;

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

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an Admin');
  }
};

export { protect, admin };
