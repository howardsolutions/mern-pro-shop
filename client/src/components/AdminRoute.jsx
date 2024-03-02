import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useBoundStore } from '../store/index';

function AdminRoute() {
  const userInfo = useBoundStore((store) => store.userInfo);

  const isAdmin = userInfo && userInfo.isAdmin;

  if (!userInfo || !isAdmin) return <Navigate to='/login' replace />;

  return <Outlet />;
}

export default AdminRoute;
