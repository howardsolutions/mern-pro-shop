import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreenPage from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

// Redux
import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreenPage />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provide store={store}>
      <RouterProvider router={router} />
    </Provide>
  </React.StrictMode>
);
