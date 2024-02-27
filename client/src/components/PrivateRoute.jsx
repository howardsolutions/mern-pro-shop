import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useBoundStore } from '../store/index';

function PrivateRoute() {
  const userInfo = useBoundStore((store) => store.userInfo);

  if (!userInfo) return <Navigate to='/login' replace />;

  return <Outlet />;
}

export default PrivateRoute;
