import express from 'express';
import products from './data/products.js';

const PORT = 4000;

const app = express();

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT} 🚀`));
