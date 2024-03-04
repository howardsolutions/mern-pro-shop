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
 * Fetch a product details
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

/**
 * Create a new Product
 * @route POST /api/products
 * @access PRIVATE ADMIN
 */
const createProduct = asyncHanler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * Create a new Product
 * @route DELETE /api/products/:id
 * @access PRIVATE ADMIN
 */

const deleteProductById = asyncHanler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Product deleted successfully' });
});

export { getProductById, getProducts, createProduct, deleteProductById };
