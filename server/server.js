import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
// CORS and Connect DB
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/productRoutes.js';

const PORT = process.env.PORT || 4000;

// Connect to the DB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Routes handler middleware
app.use('/api/products', productRoutes);

app.listen(PORT, 'localhost', () =>
  console.log(`Server listening on ${PORT} 🚀`)
);
