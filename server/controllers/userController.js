import asyncHanler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description  Auth user & get token
 * @route POST /api/users/login
 * @access PUBLIC
 */

const loginUser = asyncHanler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email });

  const isCorrectedPassword = await user.matchPassword(password);

  if (!user || !isCorrectedPassword) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // generate jwt token
  generateToken(res, user._id);

  res.status(200).json({
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
  const { name, email, password } = req.body;

  const isExistedUser = await User.findOne({ email });

  if (isExistedUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    res.status(400);
    throw new Error('Invalid user data!');
  }

  // Allow user to login right away after registration
  generateToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
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
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

/**
 * @description UPDATE  User Profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHanler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
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
