import asyncHanler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

/**
 * Fetch all products
 * @route GET /api/products
 * @access PUBLIC
 */
const getProducts = asyncHanler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * Fetch a product
 * @route GET /api/products/:id
 * @access PUBLIC
 */
const getProductById = asyncHanler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404);
  }

  res.json(product);
});

export { getProductById, getProducts };
