import asyncHanler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

/**
 * @description  Auth user & get token
 * @route POST /api/users/login
 * @access PUBLIC
 */

const authUser = asyncHanler(async (req, res) => {
  res.send('auth user');
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
  res.send('logout');
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
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
