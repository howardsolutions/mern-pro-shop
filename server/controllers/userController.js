import asyncHanler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

/**
 * @description  Auth user & get token
 * @route POST /api/users/login
 * @access PUBLIC
 */

const loginUser = asyncHanler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isCorrectedPassword = await user.matchPassword(password);

  if (!user || !isCorrectedPassword) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // set JWT as Http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV !== 'development', // for https on production, in dev we don't have https
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

/**
 * @description  Register a User
 * @route POST /api/users
 * @access PUBLIC
 */

const registerUser = asyncHanler(async (req, res) => {
  res.send('register user');
});

/**
 * @description  Logout / clear cookies
 * @route POST /api/users/logout
 * @access Private
 */

const logoutUser = asyncHanler(async (req, res) => {
  res.cookie('jwt', null, {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * @description GET User Profile
 * @route GET /api/users/profile
 * @access Private
 */

const getUserProfile = asyncHanler(async (req, res) => {
  res.send('get profile');
});

/**
 * @description UPDATE  User Profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHanler(async (req, res) => {
  res.send('update profile');
});

/**
 * @description  Get Users
 * @route GET /api/users
 * @access Private/ Admin only
 */
const getUsers = asyncHanler(async (req, res) => {
  res.send('get users');
});

/**
 * @description  Get User by ID
 * @route GET /api/users/:id
 * @access Private/ Admin only
 */
const getUserById = asyncHanler(async (req, res) => {
  res.send('get user by Id');
});

/**
 * @description  DELETE a User
 * @route DELETE /api/users
 * @access Private/ Admin only
 */
const deleteUser = asyncHanler(async (req, res) => {
  res.send('delete user');
});

/**
 * @description  UPDATE a User
 * @route PUT /api/users/:id
 * @access Private/ Admin only
 */
const updateUser = asyncHanler(async (req, res) => {
  res.send('update user');
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
