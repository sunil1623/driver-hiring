import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedUserRole({ role }) {
  console.log(role);
  return role?.type === 'user' ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedUserRole;
