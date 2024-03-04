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
  // populate the 'user' field in 'order' document with the name and email from the 'user document'
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
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body?.payer?.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

/**
 * @desciption Update order status to Paid
 * @route PUT /api/orders/deliver
 * @access PRIVATE / admin
 */
const updateOrderStatusToDelivered = asyncHanler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

/**
 * @desciption Get All Orders
 * @route GET /api/orders
 * @access PRIVATE / admin
 */
const getOrders = asyncHanler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  getOrders,
  getOrderById,
  updateOrderStatusToDelivered,
  updateOrderStatusToPaid,
  getMyOrders,
  addOrderItems,
};
