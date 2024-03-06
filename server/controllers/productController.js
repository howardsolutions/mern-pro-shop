import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

/**
 * Fetch all products
 * @route GET /api/products
 * @access PUBLIC
 */
const getProducts = asyncHandler(async (req, res) => {
  const productLimit = process.env.PRODUCT_LIMIT;

  const page = Number(req.query.pageNumber) || 1;

  const totalNumOfProduct = await Product.countDocuments();

  const products = await Product.find({})
    .limit(productLimit)
    .skip(productLimit * (page - 1));

  // page = 3 => skip(5 * (3-1)) => skip(10) skip 10 products, get from product number 15 => 20 in the list

  res.json({
    products,
    page,
    pages: Math.ceil(totalNumOfProduct / productLimit),
  });
});

/**
 * Fetch a product details
 * @route GET /api/products/:id
 * @access PUBLIC
 */
const getProductById = asyncHandler(async (req, res) => {
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
const createProduct = asyncHandler(async (req, res) => {
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
 * Delete a product by Id
 * @route DELETE /api/products/:id
 * @access PRIVATE ADMIN
 */

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Product deleted successfully' });
});

// @desc    Update a product by Id
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: 'Review added' });
});

export {
  getProductById,
  getProducts,
  createProduct,
  deleteProductById,
  updateProduct,
  createProductReview,
};
