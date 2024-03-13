import axios from 'axios';

let BACKEND_BASE_URL;

if (process.env.NODE_ENV !== 'production') {
  BACKEND_BASE_URL = 'http://localhost:4000';
} else {
  BACKEND_BASE_URL = 'https://mern-proshop-7sp5.onrender.com';
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});
