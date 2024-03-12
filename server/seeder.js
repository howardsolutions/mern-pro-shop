import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

async function importData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUsersId = createdUsers.at(0)._id;

    // all initial products are created by the admin user
    const sampleProducts = await products?.map((product) => {
      return { ...product, user: adminUsersId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Sample Data Imported!!'.green.inverse);
    process.exit(); // don't want to kill the process
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!'.red.inverse);
    process.exit(); // don't want to kill the process
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
}

if (process.argv[2] === '-i') {
  importData();
}
