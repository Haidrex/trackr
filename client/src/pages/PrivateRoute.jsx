import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

//TODO worker can go to admin pages, fix this

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = getCurrentUser();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
