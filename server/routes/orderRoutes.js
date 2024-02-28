import express from 'express';
const router = express.Router();
import {
  getOrders,
  getOrderById,
  updateOrderStatusToDelivered,
  updateOrderStatusToPaid,
  getMyOrders,
  addOrderItems,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderStatusToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderStatusToDelivered);

export default router;
