import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = getCurrentUser();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
