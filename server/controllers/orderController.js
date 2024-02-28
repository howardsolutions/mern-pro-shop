import asyncHanler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

/**
 * @desciption Create new Order Items
 * @route POST /api/orders
 * @access PRIVATE
 */
const addOrderItems = asyncHanler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    orderItems: orderItems.map((orderItem) => ({
      ...orderItem,
      product: orderItem._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/**
 * @desciption Get Logged in user Orders
 * @route GET /api/orders/myorders
 * @access PRIVATE
 */
const getMyOrders = asyncHanler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    res.status(404);
    throw new Error('No orders!');
  }

  res.status(200).json(orders);
});

/**
 * @desciption Get Logged in user Order by Id
 * @route GET /api/orders/:id
 * @access PRIVATE
 */
const getOrderById = asyncHanler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
});

/**
 * @desciption Update order status to Paid
 * @route PUT /api/orders/pay
 * @access PRIVATE/ admin
 */
const updateOrderStatusToPaid = asyncHanler(async (req, res) => {
  res.send('update order to paid');
});

/**
 * @desciption Update order status to Paid
 * @route PUT /api/orders/deliver
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
  getOrderById,
  updateOrderStatusToDelivered,
  updateOrderStatusToPaid,
  getMyOrders,
  addOrderItems,
};
