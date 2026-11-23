import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const roles = JSON.parse(localStorage.getItem("roles") || []);
  const isAdmin = roles.some(role => role.authority === "ROLE_ADMIN");

  if(!isAdmin){
    return <Navigate to="/" replace />
  }

  return children;

}

export default AdminRoute