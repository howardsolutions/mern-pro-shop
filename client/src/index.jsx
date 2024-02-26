import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
// React Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// UI PAGE
import HomeScreenPage from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreenPage />}></Route>
      <Route path='/cart' element={<CartScreen />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
