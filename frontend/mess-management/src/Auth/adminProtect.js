import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("token");

  return isAdmin && token ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
