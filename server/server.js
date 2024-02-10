import express from 'express';
import { products } from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 4000;

// Connect to the DB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(PORT, 'localhost', () =>
  console.log(`Server listening on ${PORT} 🚀`)
);
