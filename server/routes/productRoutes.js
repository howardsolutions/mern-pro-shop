import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProductById,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .delete(protect, admin, checkObjectId, deleteProductById)
  .put(protect, admin, checkObjectId, updateProduct);

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;
