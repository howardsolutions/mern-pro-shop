import asyncHanler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel';

/**
 * @desciption Create new Order Items
 * @route POST /api/orders
 * @access PRIVATE
 */
const addOrderItems = asyncHanler(async (req, res) => {
  res.send('add order items');
});

/**
 * @desciption Get Logged in user Orders
 * @route GET /api/orders/myorders
 * @access PRIVATE
 */
const getMyOrders = asyncHanler(async (req, res) => {
  res.send('get my orders');
});

/**
 * @desciption Get Logged in user Order by Id
 * @route GET /api/orders/:id
 * @access PRIVATE
 */
const getMyOrder = asyncHanler(async (req, res) => {
  res.send('get my order');
});

/**
 * @desciption Update order status to Paid
 * @route GET /api/orders/:id
 * @access PRIVATE/ admin
 */
const updateOrderStatusToPaid = asyncHanler(async (req, res) => {
  res.send('update order to paid');
});

/**
 * @desciption Update order status to Paid
 * @route GET /api/orders/:id
 * @access PRIVATE / admin
 */
const updateOrderStatusToDelivered = asyncHanler(async (req, res) => {
  res.send('update order to delivered');
});

/**
 * @desciption Get All Orders
 * @route GET /api/orders
 * @access PRIVATE / admin
 */
const getOrders = asyncHanler(async (req, res) => {
  res.send('admin get all orders');
});

export {
  getOrders,
  getMyOrder,
  updateOrderStatusToDelivered,
  updateOrderStatusToPaid,
  getMyOrders,
  addOrderItems,
};
