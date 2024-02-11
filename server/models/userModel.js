import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({});

const User = mongoose.model('User', userSchema);

export default User;
