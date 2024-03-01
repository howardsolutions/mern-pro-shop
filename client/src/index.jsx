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
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreenPage />}></Route>
      <Route path='/cart' element={<CartScreen />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>

      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen />}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
        <Route path='/order/:id' element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
