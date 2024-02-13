import express from 'express';
import asyncHanler from '../middleware/asyncHandler';
import Product from '../models/productModel';

const router = express.Router();

router.get(
  '/',
  asyncHanler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHanler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  })
);

export default router;
